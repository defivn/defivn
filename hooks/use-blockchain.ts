import { useState, useEffect, useCallback } from 'react'
import {
  ChainType,
  ChainState,
  Transaction,
  ModalState,
  Recipient,
  NFT
} from '../types/blockchain'
import {
  generateTransactionId,
  generateNFTId,
  generateTransactionFee,
  validateSendMoney,
  validatePurchaseNFT,
  validateSellNFT,
  validateDepositSavings,
  validateBridge,

  calculateCurrentEarnings,
  updateNFTPrices,
  getNFTCurrentPrice,
  markNFTAsSold,
  formatETH,
  TRANSACTION_DURATION,
  ROLLUP_TRANSACTION_DURATION,
  EARNINGS_INTERVAL
} from '@/lib/blockchain/transactions'

const initialEthereumState: ChainState = {
  balance: 0.0, // 0 ETH starting balance
  nfts: [],
  savingsDeposit: 0,
  savingsLastUpdate: new Date(),
  pendingTransactions: 0,
  recipientBalances: {
      Alice: 0,
      Bob: 0,
      Carol: 0,
      Eve: 0,
      Splitter: 0
  },
  pendingSells: new Set()
}

const initialRollupState: ChainState = {
  balance: 0,
  nfts: [],
  savingsDeposit: 0,
  savingsLastUpdate: new Date(),
  pendingTransactions: 0,
  recipientBalances: {
      Alice: 0,
      Bob: 0,
      Carol: 0,
      Eve: 0,
      Splitter: 0
  },
  pendingSells: new Set()
}

export const useBlockchain = () => {
  const [ethereumState, setEthereumState] = useState<ChainState>(initialEthereumState)
  const [rollupState, setRollupState] = useState<ChainState>(initialRollupState)
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([])
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: 'success',
    message: ''
  })
  const [currentPendingTransaction, setCurrentPendingTransaction] = useState<Transaction | null>(null)
  const [transactionNonce, setTransactionNonce] = useState<number>(1)

  // Update earnings timestamp every second (but don't auto-claim)
  useEffect(() => {
    const earningsInterval = setInterval(() => {
      // We no longer auto-claim interest here
      // Interest will accumulate and be shown in the UI
      // Users must manually claim it using the claim button
    }, EARNINGS_INTERVAL) // Check every second

    return () => clearInterval(earningsInterval)
  }, [])

  // Update NFT prices every 6 seconds
  useEffect(() => {
    const priceInterval = setInterval(() => {
      updateNFTPrices()
    }, 6000) // Update every 6 seconds

    return () => clearInterval(priceInterval)
  }, [])

  const showModal = useCallback((type: 'success' | 'error', message: string) => {
    setModalState({ isOpen: true, type, message })
    setTimeout(() => {
      setModalState(prev => ({ ...prev, isOpen: false }))
    }, 3000) // Auto-close after 3 seconds
  }, [])

  const showPendingModal = useCallback((transaction: Transaction) => {
    setCurrentPendingTransaction(transaction)
    const pendingMessage = getPendingMessage(transaction)
    setModalState({ isOpen: true, type: 'success', message: pendingMessage })
  }, [])

  const getPendingMessage = (transaction: Transaction): string => {
    switch (transaction.type) {
      case 'send':
        return `Sending ${formatETH(transaction.amount)} to ${transaction.recipient}...`
      case 'purchase_nft':
        return `Purchasing NFT for ${formatETH(transaction.amount)}...`
      case 'sell_nft':
        return `Selling NFT for ${formatETH(transaction.amount)}...`
      case 'deposit_earnings':
        return `Depositing ${formatETH(transaction.amount)} to earn...`
      case 'withdraw_earnings':
        return `Withdrawing ${formatETH(transaction.amount)} from earn...`
      case 'claim_earnings':
        return `Claiming ${formatETH(transaction.amount)} interest...`
      case 'bridge':
        return `Bridging ${formatETH(transaction.amount)} to Rollup...`
      default:
        return `Processing ${String(transaction.type).replace('_', ' ')}...`
    }
  }

  const closeModal = useCallback(() => {
    setModalState(prev => ({ ...prev, isOpen: false }))
    setCurrentPendingTransaction(null)
  }, [])

  const updateChainState = useCallback((chain: ChainType, updater: (prev: ChainState) => ChainState) => {
    if (chain === 'ethereum') {
      setEthereumState(updater)
    } else {
      setRollupState(updater)
    }
  }, [])

  const processTransaction = useCallback((transaction: Transaction, stateUpdater?: (prev: ChainState) => ChainState, duration: number = TRANSACTION_DURATION) => {
    // Assign nonce and increment counter
    const transactionWithNonce = { ...transaction, nonce: transactionNonce }
    setTransactionNonce(prev => prev + 1)

    // Add transaction to history as pending
    setTransactionHistory(prev => [...prev, transactionWithNonce])

    // Increment pending transactions count
    updateChainState(transactionWithNonce.chain, prev => ({
      ...prev,
      pendingTransactions: prev.pendingTransactions + 1
    }))

    // Show pending modal immediately
    showPendingModal(transactionWithNonce)

    // Process transaction after delay
    setTimeout(() => {
      setTransactionHistory(prev =>
        prev.map(tx =>
          tx.id === transactionWithNonce.id
            ? { ...tx, status: 'confirmed' as const, completionTime: new Date() }
            : tx
        )
      )

      // Apply the state changes when transaction is confirmed
      if (stateUpdater) {
        updateChainState(transactionWithNonce.chain, stateUpdater)
      }

      // Decrement pending transactions count
      updateChainState(transactionWithNonce.chain, prev => ({
        ...prev,
        pendingTransactions: prev.pendingTransactions - 1
      }))

      // Generate detailed confirmation message
      const getConfirmationMessage = (tx: Transaction) => {
        switch (tx.type) {
          case 'send':
            return `Sent ${formatETH(tx.amount)} to ${tx.recipient}`
          case 'purchase_nft':
            return `Purchased NFT for ${formatETH(tx.amount)}`
          case 'sell_nft':
            return `Sold NFT for ${formatETH(tx.amount)}`
          case 'deposit_earnings':
            return `Deposited ${formatETH(tx.amount)} to earn`
          case 'withdraw_earnings':
            return `Withdrew ${formatETH(tx.amount)} from earn`
          case 'claim_earnings':
            return `Claimed ${formatETH(tx.amount)} interest`
          case 'bridge':
            return `Bridged ${formatETH(tx.amount)} to Rollup`
          default:
            return `Confirmed: ${String(tx.type).replace('_', ' ')}`
        }
      }

      // Update modal to show confirmation and clear pending transaction
      setCurrentPendingTransaction(null)
      showModal('success', getConfirmationMessage(transactionWithNonce))
    }, duration)
  }, [updateChainState, showModal, showPendingModal, transactionNonce])

  const sendMoney = useCallback((chain: ChainType, recipient: Recipient, amount: number) => {
    const chainState = chain === 'ethereum' ? ethereumState : rollupState
    const fee = generateTransactionFee(chain === 'rollup')
    const validation = validateSendMoney(chainState, amount, fee)

    if (!validation.isValid) {
      showModal('error', validation.error!)
      return
    }

    const transaction: Transaction = {
      id: generateTransactionId(),
      chain,
      type: 'send',
      amount,
      fee,
      recipient,
      status: 'pending',
      timestamp: new Date(),
      nonce: 0 // Will be assigned in processTransaction
    }

    // Define the state update to apply when transaction is confirmed
    const stateUpdater = (prev: ChainState) => ({
      ...prev,
      balance: prev.balance - amount - fee, // Deduct both amount and fee
      recipientBalances: {
        ...prev.recipientBalances,
        [recipient]: prev.recipientBalances[recipient] + amount
      }
    })

    processTransaction(transaction, stateUpdater, chain === 'rollup' ? ROLLUP_TRANSACTION_DURATION : TRANSACTION_DURATION)
  }, [ethereumState, rollupState, showModal, processTransaction])

  const sendToSplitter = useCallback((chain: ChainType, amount: number) => {
    const chainState = chain === 'ethereum' ? ethereumState : rollupState
    const fee = generateTransactionFee(chain === 'rollup')
    const validation = validateSendMoney(chainState, amount, fee)

    if (!validation.isValid) {
      showModal('error', validation.error!)
      return
    }

    const transaction: Transaction = {
      id: generateTransactionId(),
      chain,
      type: 'send',
      amount,
      fee,
      recipient: 'Splitter' as Recipient,
      status: 'pending',
      timestamp: new Date(),
      nonce: 0 // Will be assigned in processTransaction
    }

    // Define the state update to apply when transaction is confirmed
    // The splitter automatically distributes the amount equally to Alice, Bob, and Carol
    const splitAmount = amount / 3
    const stateUpdater = (prev: ChainState) => ({
      ...prev,
      balance: prev.balance - amount - fee, // Deduct both amount and fee
      recipientBalances: {
        ...prev.recipientBalances,
        Alice: prev.recipientBalances.Alice + splitAmount,
        Bob: prev.recipientBalances.Bob + splitAmount,
        Carol: prev.recipientBalances.Carol + splitAmount
      }
    })

    processTransaction(transaction, stateUpdater, chain === 'rollup' ? ROLLUP_TRANSACTION_DURATION : TRANSACTION_DURATION)
  }, [ethereumState, rollupState, showModal, processTransaction])

  const purchaseNFT = useCallback((chain: ChainType, nftId: string, price: number, emoji: string) => {
    const chainState = chain === 'ethereum' ? ethereumState : rollupState
    const fee = generateTransactionFee(chain === 'rollup')
    const validation = validatePurchaseNFT(chainState, price, fee)

    if (!validation.isValid) {
      showModal('error', validation.error!)
      return
    }

    const newNFT: NFT = {
      id: generateNFTId(),
      name: nftId,
      purchasePrice: price,
      purchaseDate: new Date(),
      emoji
    }

    const transaction: Transaction = {
      id: generateTransactionId(),
      chain,
      type: 'purchase_nft',
      amount: price,
      fee,
      nftId: newNFT.id,
      status: 'pending',
      timestamp: new Date(),
      nonce: 0 // Will be assigned in processTransaction
    }

    // Define the state update to apply when transaction is confirmed
    const stateUpdater = (prev: ChainState) => ({
      ...prev,
      balance: prev.balance - price - fee, // Deduct both price and fee
      nfts: [...prev.nfts, newNFT]
    })

    processTransaction(transaction, stateUpdater, chain === 'rollup' ? ROLLUP_TRANSACTION_DURATION : TRANSACTION_DURATION)
  }, [ethereumState, rollupState, showModal, processTransaction])

  const sellNFT = useCallback((chain: ChainType, nftId: string) => {
    const chainState = chain === 'ethereum' ? ethereumState : rollupState
    const validation = validateSellNFT(chainState, nftId)

    if (!validation.isValid) {
      showModal('error', validation.error!)
      return
    }

    // Check if this NFT already has a pending sell
    if (chainState.pendingSells.has(nftId)) {
      showModal('error', 'This NFT already has a pending sell transaction')
      return
    }

    // Get current market price for the NFT
    const nft = validation.nft!
    const sellPrice = Math.round(getNFTCurrentPrice(nft.name) * 1000) / 1000 // Round to 3 decimal places for ETH
    const fee = generateTransactionFee(chain === 'rollup')

    const transaction: Transaction = {
      id: generateTransactionId(),
      chain,
      type: 'sell_nft',
      amount: sellPrice,
      fee,
      nftId,
      status: 'pending',
      timestamp: new Date(),
      nonce: 0 // Will be assigned in processTransaction
    }

    // Add to pending sells immediately
    updateChainState(chain, prev => ({
      ...prev,
      pendingSells: new Set([...prev.pendingSells, nftId])
    }))

    // Define the state update to apply when transaction is confirmed
    const stateUpdater = (prev: ChainState) => {
      const newPendingSells = new Set(prev.pendingSells)
      newPendingSells.delete(nftId)

      // Mark NFT as sold globally (1/1 inventory)
      markNFTAsSold(nft.name)

      return {
        ...prev,
        balance: prev.balance + sellPrice - fee, // Add sell price but deduct fee
        nfts: prev.nfts.filter(nft => nft.id !== nftId),
        pendingSells: newPendingSells
      }
    }

    processTransaction(transaction, stateUpdater, chain === 'rollup' ? ROLLUP_TRANSACTION_DURATION : TRANSACTION_DURATION)
  }, [ethereumState, rollupState, updateChainState, showModal, processTransaction])

  const depositEarnings = useCallback((chain: ChainType, amount: number) => {
    const chainState = chain === 'ethereum' ? ethereumState : rollupState
    const fee = generateTransactionFee(chain === 'rollup')
    const validation = validateDepositSavings(chainState, amount, fee)

    if (!validation.isValid) {
      showModal('error', validation.error!)
      return
    }

    const transaction: Transaction = {
      id: generateTransactionId(),
      chain,
      type: 'deposit_earnings',
      amount,
      fee,
      status: 'pending',
      timestamp: new Date(),
      nonce: 0 // Will be assigned in processTransaction
    }

    // Define the state update to apply when transaction is confirmed
    const stateUpdater = (prev: ChainState) => ({
      ...prev,
      balance: prev.balance - amount - fee, // Deduct both amount and fee
      savingsDeposit: prev.savingsDeposit + amount,
      savingsLastUpdate: new Date()
    })

    processTransaction(transaction, stateUpdater, chain === 'rollup' ? ROLLUP_TRANSACTION_DURATION : TRANSACTION_DURATION)
  }, [ethereumState, rollupState, showModal, processTransaction])

  const withdrawEarnings = useCallback((chain: ChainType, amount: number) => {
    const chainState = chain === 'ethereum' ? ethereumState : rollupState
    const fee = generateTransactionFee(chain === 'rollup')

    if (amount <= 0) {
      showModal('error', 'Amount must be greater than 0')
      return
    }

    if (amount > chainState.savingsDeposit) {
      showModal('error', 'Insufficient earnings balance')
      return
    }

    const transaction: Transaction = {
      id: generateTransactionId(),
      chain,
      type: 'withdraw_earnings',
      amount,
      fee,
      status: 'pending',
      timestamp: new Date(),
      nonce: 0 // Will be assigned in processTransaction
    }

    // Define the state update to apply when transaction is confirmed
    const stateUpdater = (prev: ChainState) => ({
      ...prev,
      balance: prev.balance + amount - fee, // Add amount but deduct fee
      savingsDeposit: prev.savingsDeposit - amount,
      savingsLastUpdate: new Date()
    })

    processTransaction(transaction, stateUpdater, chain === 'rollup' ? ROLLUP_TRANSACTION_DURATION : TRANSACTION_DURATION)
  }, [ethereumState, rollupState, showModal, processTransaction])

  const claimEarnings = useCallback((chain: ChainType) => {
    const chainState = chain === 'ethereum' ? ethereumState : rollupState
    const accruedInterest = calculateCurrentEarnings(chainState)
    const fee = generateTransactionFee(chain === 'rollup')

    if (accruedInterest <= 0) {
      showModal('error', 'No accrued interest to claim')
      return
    }

    const transaction: Transaction = {
      id: generateTransactionId(),
      chain,
      type: 'claim_earnings',
      amount: accruedInterest,
      fee,
      status: 'pending',
      timestamp: new Date(),
      nonce: 0 // Will be assigned in processTransaction
    }

    // Define the state update to apply when transaction is confirmed
    const stateUpdater = (prev: ChainState) => ({
      ...prev,
      balance: prev.balance + accruedInterest - fee, // Add interest but deduct fee
      savingsLastUpdate: new Date()
    })

    processTransaction(transaction, stateUpdater, chain === 'rollup' ? ROLLUP_TRANSACTION_DURATION : TRANSACTION_DURATION)
  }, [ethereumState, rollupState, showModal, processTransaction])

  const bridgeToRollup = useCallback((amount: number) => {
    const fee = generateTransactionFee(false) // Mainnet fee for bridge transaction
    const validation = validateBridge(ethereumState, amount, fee)

    if (!validation.isValid) {
      showModal('error', validation.error!)
      return
    }

    const transaction: Transaction = {
      id: generateTransactionId(),
      chain: 'ethereum',
      type: 'bridge',
      amount,
      fee,
      status: 'pending',
      timestamp: new Date(),
      nonce: 0 // Will be assigned in processTransaction
    }

    // Define the state update to apply when transaction is confirmed
    const stateUpdater = (prev: ChainState) => ({
      ...prev,
      balance: prev.balance - amount - fee // Deduct both amount and fee from mainnet
    })

    // Process the mainnet transaction
    processTransaction(transaction, stateUpdater, TRANSACTION_DURATION)

    // After mainnet confirmation, add the amount to rollup (minus the mainnet fee)
    setTimeout(() => {
      setRollupState(prev => ({
        ...prev,
        balance: prev.balance + amount // Add the bridged amount to rollup
      }))
      showModal('success', `Bridged ${amount.toFixed(4)} ETH to Rollup`)
    }, TRANSACTION_DURATION + 100) // Slight delay after mainnet confirmation
  }, [ethereumState, showModal, processTransaction])

  const receiveETH = useCallback(() => {
    const amount = 1.0 // Always receive 1 ETH

    // Privileged action: Update balance immediately without transaction processing or popups
    setEthereumState(prev => ({
      ...prev,
      balance: prev.balance + amount
    }))
  }, [])

  return {
    ethereumState,
    rollupState,
    transactionHistory,
    modalState,
    currentPendingTransaction,
    sendMoney,
    sendToSplitter,
    purchaseNFT,
    sellNFT,
    depositEarnings,
    withdrawEarnings,
    claimEarnings,
    bridgeToRollup,
    receiveETH,
    calculateCurrentEarnings,
    showModal,
    closeModal
  }
}

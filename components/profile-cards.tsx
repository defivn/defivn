import React, { useState, useEffect, useRef } from "react";
import { Recipient } from "@/types/blockchain";
import { formatETH } from "@/lib/blockchain/transactions";
import {
  getRecipientAddress,
  getRecipientBackgroundColor,
  getRecipientEmoji,
} from "@/lib/blockchain/recipients";
import { useBlockchainContext } from "@/contexts/blockchain-context";
import CharacterDialogue from "./character-dialogue";

interface ProfileCardsProps {
  recipients?: Recipient[];
  className?: string;
}

const ProfileCards: React.FC<ProfileCardsProps> = ({
  recipients = ["Alice", "Bob", "Carol"],
  className = "",
}) => {
  const { ethereumState } = useBlockchainContext();
  const [selectedCharacter, setSelectedCharacter] = useState<Recipient | null>(
    null
  );
  const [dialogueCharacter, setDialogueCharacter] = useState<Recipient | null>(
    null
  );
  const previousBalances = useRef<Partial<Record<Recipient, number>>>({});

  // Track balance changes and trigger dialogue when funds are received
  useEffect(() => {
    recipients.forEach((recipient) => {
      const currentBalance = ethereumState.recipientBalances[recipient] || 0;
      const previousBalance = previousBalances.current[recipient] || 0;

      // If balance increased, show dialogue
      if (currentBalance > previousBalance && previousBalance !== undefined) {
        setDialogueCharacter(recipient);
      }

      previousBalances.current[recipient] = currentBalance;
    });
  }, [ethereumState.recipientBalances, recipients]);

  const handleCharacterClick = (recipient: Recipient) => {
    setSelectedCharacter(recipient);
  };

  const handleCloseDialogue = () => {
    setSelectedCharacter(null);
  };

  const handleDialogueComplete = () => {
    setDialogueCharacter(null);
  };

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
        {recipients.map((recipient) => {
          const balance = ethereumState.recipientBalances[recipient] || 0;
          return (
            <div key={recipient} className="relative">
              <div
                onClick={() => handleCharacterClick(recipient)}
                className={`${getRecipientBackgroundColor(
                  recipient
                )} rounded-lg p-4 text-center transition-all cursor-pointer border`}
              >
                <div className="text-4xl mb-2">
                  {getRecipientEmoji(recipient)}
                </div>
                <div className="text-lg font-semibold mb-1">{recipient}</div>
                <div className="text-xs text-muted-foreground break-all mb-1">
                  {getRecipientAddress(recipient)}
                </div>
                <div className="text-sm font-bold mb-2">
                  {formatETH(balance)}
                </div>
              </div>

              {/* Speech Bubble for receiving funds */}
              {dialogueCharacter === recipient && (
                <CharacterDialogue
                  character={recipient}
                  balance={balance}
                  isVisible={true}
                  onComplete={handleDialogueComplete}
                  className="bottom-full left-1/2 transform -translate-x-1/2 mb-2"
                />
              )}

              {/* Speech Bubble for clicking */}
              {selectedCharacter === recipient && (
                <CharacterDialogue
                  character={recipient}
                  balance={balance}
                  isVisible={true}
                  onComplete={handleCloseDialogue}
                  className="bottom-full left-1/2 transform -translate-x-1/2 mb-2"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileCards;

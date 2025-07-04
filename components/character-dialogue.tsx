import React, { useState, useEffect } from "react";
import { Recipient } from "@/types/blockchain";
import { getRecipientEmoji } from "@/lib/blockchain/recipients";
interface CharacterDialogueProps {
  character: Recipient;
  balance: number;
  isVisible: boolean;
  onComplete: () => void;
  className?: string;
}

// Dialogue data based on personality and wealth levels
const dialogueData: Record<
  Recipient,
  {
    personality: string;
    dialogues: {
      broke: string[];
      poor: string[];
      comfortable: string[];
      wealthy: string[];
    };
  }
> = {
  Alice: {
    personality: "vui vẻ, lầy lội",
    dialogues: {
      broke: [
        "Tui nghèo tới mức không có tiền để quan tâm luôn á! 😅",
        "Ví tui trống trơn, tình yêu cũng vậy luôn! 💸",
        "Tui có 99 vấn đề, và tiền là chuyện vui nhất! 🤷‍♀️",
        "Nghèo thì nghèo, nhưng vẫn pha trò vui được mà! 😂",
      ],
      poor: [
        "Cuối cùng cũng có tiền mua ly cà phê! ☕",
        "Tiêu vặt thôi mà, tui thấy mình sang ghê! 💅",
        "Tui là Warren Buffett phiên bản tiền lẻ nè! 📈",
        "Đồng này nóng quá, túi tui sắp cháy luôn! 🔥",
      ],
      comfortable: [
        "Giờ thì sống khoẻ rồi, không còn lo tiền nữa! 🍜",
        "Có tiền rồi, tha hồ mua meme sống ảo! 🎭",
        "Đủ giàu để boa mà không suy nghĩ luôn! 💰",
        "Tới lúc update profile: 'Cuộc sống Crypto' ✨",
      ],
      wealthy: [
        "Tui giàu tới mức dùng coin làm bookmark luôn á! 📚",
        "Tui lướt nhẹ, tụi nó ganh tị với ví tui kìa! 🎵",
        "Tui không hay kiểm tra số dư, nhưng mỗi lần check là cháy! 😎",
        "Giàu đủ để mua Twitter… nhưng thôi, trễ rồi! 🐦",
      ],
    },
  },
  Bob: {
    personality: "nghiêm túc, chững chạc",
    dialogues: {
      broke: [
        "Tình hình này cần xem lại gấp.",
        "Tui phải rà soát lại cách quản lý tiền.",
        "Cần tìm cách kiếm thêm nguồn thu khác.",
        "Phải ưu tiên học cách quản lý tài chính.",
      ],
      poor: [
        "Bắt đầu nhỏ cũng tốt, miễn là có khởi đầu.",
        "Từng chút một rồi cũng sẽ có thành quả.",
        "Tiền ít nhưng biết tính thì sẽ tăng theo thời gian.",
        "Phải chia tiền hợp lý, làm gì cũng có kế hoạch.",
      ],
      comfortable: [
        "Số dư này ổn, xài cũng thoải mái rồi.",
        "Đầu tư kiểu này giữ được tiền, vẫn linh hoạt.",
        "Ví đang tăng đều, nhìn cũng vui.",
        "Có thể cân nhắc mấy kèo đầu tư xịn hơn.",
      ],
      wealthy: [
        "Kế hoạch ngon lành, kết quả quá ổn.",
        "Tích luỹ từ từ mà chắc ăn.",
        "Giờ tập trung giữ tiền và làm nó sinh lời thêm.",
        "Vị trí này đủ tự do, không lo nghĩ nhiều.",
      ],
    },
  },
  Carol: {
    personality: "rất tiết kiệm, hơi keo",
    dialogues: {
      broke: [
        "Một đồng cũng quý nha! Tui đếm từng xu đó! 💰",
        "Không chấp nhận được! Phải gom tiền ngay! 😤",
        "Tui tính từng hơi thở luôn đó, khỏi đùa! 📊",
        "Ví không có tiền là khỏi tiêu nha! 🔒",
      ],
      poor: [
        "Cuối cùng cũng có tiền, nhưng đừng mơ tui tiêu! 💎",
        "Đồng này tui đem giấu dưới gối! 🛏️",
        "Tui sẽ giữ tiền như rồng giữ vàng! 🐉",
        "Phí dịch vụ là tội ác với tui nha! 😠",
      ],
      comfortable: [
        "Ổn rồi, nhưng tui muốn nhiều hơn nữa!",
        "Giàu nhưng không xài thêm gì đâu! 🚫",
        "Số dư này ổn, nhưng lãi kép vẫn là chân ái! 💹",
        "Tui tiết kiệm siêu cấp, tiền đang ngoan lắm! 🏦",
      ],
      wealthy: [
        "Tuyệt! Giờ tui có thể keo kiệt vui vẻ rồi! 💸",
        "Giàu đủ để mua, nhưng keo quá nên không thèm giữ! 🛒",
        "Tiền tui thì cứ tăng, người ta thì tiêu mãi! 📊",
        "Giàu tới mức tui tự thu phí cho mấy suy nghĩ của mình luôn! 🏠",
      ],
    },
  },
  Eve: {
    personality: "bí ẩn, ít nói",
    dialogues: {
      broke: [
        "Thú vị… quan sát thấy ưu tiên đang thay đổi.",
        "Ví trống trơn, hoàn hảo để ẩn mình.",
        "Không có tiền đôi khi lại là kho báu lớn nhất.",
        "Ví rỗng, nhưng lại chứa nhiều bí mật.",
      ],
      poor: [
        "Có ít tiền, di chuyển cũng dễ, không ai để ý.",
        "Ít tiền nhưng an toàn, không gây chú ý.",
        "Số dư này đủ cho kế hoạch của tui… hiện tại.",
        "Khoản nhỏ nhất lại che giấu điều to lớn.",
      ],
      comfortable: [
        "Tiền đủ cho mấy kế hoạch bí mật của tui.",
        "Số dư vừa đủ để không ai nghi ngờ.",
        "Thoải mái nhưng vẫn ẩn mình, không ai để ý.",
        "Số dư hoàn hảo cho người sống trong bóng tối.",
      ],
      wealthy: [
        "Giàu thì dễ bị chú ý… và dễ gặp rắc rối.",
        "Đủ tiền để vận hành mấy vụ ngầm rồi.",
        "Tiền mở ra cánh cửa… và cũng đóng lại vài cái.",
        "Giàu có và bí ẩn luôn đi kèm trách nhiệm và bí mật.",
      ],
    },
  },
  Splitter: {
    personality: "",
    dialogues: {
      broke: [],
      poor: [],
      comfortable: [],
      wealthy: [],
    },
  },
};

const getWealthLevel = (
  balance: number
): keyof typeof dialogueData.Alice.dialogues => {
  if (balance === 0) return "broke";
  if (balance < 0.1) return "poor";
  if (balance < 0.5) return "comfortable";
  return "wealthy";
};

const getRandomDialogue = (character: Recipient, balance: number): string => {
  const wealthLevel = getWealthLevel(balance);
  const characterData = dialogueData[character];

  if (!characterData) return "Hello there!";

  const dialogues = characterData.dialogues[wealthLevel];
  return dialogues[Math.floor(Math.random() * dialogues.length)];
};

const CharacterDialogue: React.FC<CharacterDialogueProps> = ({
  character,
  balance,
  isVisible,
  onComplete,
  className = "",
}) => {
  const [dialogue, setDialogue] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setDialogue(getRandomDialogue(character, balance));
      setIsAnimating(true);

      // Auto-dismiss after 4 seconds
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => {
          onComplete();
        }, 300); // Wait for fade out animation
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [character, balance, isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`absolute z-50 ${className}`}>
      {/* Speech Bubble */}
      <div
        className={`
          relative bg-background rounded-lg shadow-xl p-4 max-w-sm w-80 border
          transition-all duration-300 ease-in-out transform
          ${
            isAnimating
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-2"
          }
        `}
      >
        {/* Speech Bubble Tail */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
          <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-background"></div>
        </div>

        {/* Character Emoji */}
        <div className="flex items-center space-x-2 mb-2">
          <div className="text-lg">{getRecipientEmoji(character)}</div>
          <div className="text-sm font-semibold text-foreground">
            {character}
          </div>
        </div>

        {/* Dialogue Text */}
        <p className="text-sm text-foreground leading-relaxed">{dialogue}</p>
      </div>
    </div>
  );
};

export default CharacterDialogue;

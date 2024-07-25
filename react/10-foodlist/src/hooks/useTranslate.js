import { useLocale } from "../contexts/FoodContext";

const dict = {
  ko: {
    "confirm button": "확인",
    "cancel button": "취소",
    "edit button": "수정",
    "delete button": "삭제",
    "title placeholder": "제목",
    "content placeholder": "내용",
    "terms of service": "서비스 이용약관",
    "privary policy": "개인정보 처리방침",
    "load more ": "더 보기",
    newest: "최신순",
    calorie: "칼로리순",
  },
  en: {
    "confirm button": "OK",
    "cancel button": "Cancel",
    "edit button": "Edit",
    "delete button": "Delete",
    "title placeholder": "Typing Title",
    "content placeholder": "Typing Content",
    "terms of service": "Terms of Service",
    "privary policy": "Privacy Policy",
    "load more ": "Load More ",
    newest: "Newest",
    calorie: "Best",
  },
};

function useTranslate() {
  const locale = useLocale();
  const translate = (key) => dict[locale][key] || "";
  return translate;
}

export default useTranslate;

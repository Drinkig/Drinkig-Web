export interface Notice {
    id: number;
    title: string;
    date: string;
    content: string;
}

export const notices: Notice[] = [
    {
        id: 1,
        title: "드링키지 웹사이트 오픈 안내",
        date: "2025-12-25",
        content: "드링키지(Drinkig) 웹사이트가 공식 오픈되었습니다.\n앱에서만 만나보던 드링키지를 이제 웹에서도 확인해보세요.\n\n앞으로 다양한 소식과 정보를 전달해드리겠습니다.\n감사합니다."
    }
];

export function getNotice(id: number): Notice | undefined {
    return notices.find(n => n.id === id);
}

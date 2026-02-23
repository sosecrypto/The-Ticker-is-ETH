export function formatDate(dateInput: string | Date): string {
    const d = dateInput instanceof Date ? dateInput : new Date(dateInput);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export function isStillActive(lastMessageDate: string): boolean {
    const lastDate = new Date(lastMessageDate);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return lastDate >= oneMonthAgo;
}

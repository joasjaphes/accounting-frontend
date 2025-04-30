export interface Account {
    id: string;
    name: string;
    description: string;
    category: string;
    parent?:string;
    children?: Account[];
}
export class Tasks{

    name: string;
    id: number;
    dueDate: string;
    isImportant: boolean;
    description: string;
    tags: Tag[]
    isCompleted: boolean;
    isDeleted: boolean;
    constructor(){
        this.name = ''
        this.id = 0;
        this.dueDate = ''
        this.isImportant = false
        this.isDeleted = false
        this.isCompleted = false
        this.description = ''
        this.tags =[
            {
                type: 'education',
                isTrue: false,
                color: '#28C76F',
                bgColor: '#28C76F1F',
                content: 'Образование'
            },
            {
                type: 'health',
                isTrue: false,
                color: '#EA5455',
                bgColor:'#EA54551F',
                content: 'Здоровье'
            },
            {
                type: 'isUrgent',
                isTrue: false,
                color: '#FF9F43',
                bgColor: '#FF9F431F',
                content: 'Срочно'
            },
            {
                type: 'productive',
                isTrue: false,
                color: '#7367F0',
                bgColor: '#2772081F',
                content: 'Продуктивность'
            }
        ]
        
    }
    allTagsFalse(): boolean {
        return this.tags.every(tag => !tag.isTrue);
      }
}
interface Tag{
    type: string;
    isTrue: boolean;
    color: string;
    bgColor: string;
    content: string;
}
import { Option } from "./option"

export interface Question {
    id: number,
    name: string
    options: Option[]
}

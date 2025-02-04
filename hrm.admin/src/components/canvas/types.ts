export interface IComponentDescriptor {
  type: string
  title?: string
  collapsible?: boolean
  collapsed?: boolean
  closable?:boolean
  props?: unknown
  id?: string
}
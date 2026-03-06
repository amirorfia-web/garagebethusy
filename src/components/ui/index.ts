/**
 * Barrel export — Bibliothèque UI
 * Import: import { Button, Badge, Card } from '@/components/ui'
 */

export { default as Button }          from './Button'
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button'
export { WhatsAppIcon }               from './Button'

export { default as Badge }           from './Badge'
export type { BadgeProps, BadgeVariant } from './Badge'

export { default as Card }            from './Card'
export type { CardProps }             from './Card'

export { default as VehicleCard }     from './VehicleCard'
export type { VehicleCardProps, VehicleSource } from './VehicleCard'

export { default as WhatsAppContact } from './WhatsAppContact'
export type { WhatsAppContactProps }  from './WhatsAppContact'

export { default as FormInput }       from './FormInput'
export type { FormInputProps }        from './FormInput'
export { inputBase, inputError, labelBase } from './FormInput'

export { default as FormSelect }      from './FormSelect'
export type { FormSelectProps, SelectOption } from './FormSelect'

export { default as FormTextarea }    from './FormTextarea'
export type { FormTextareaProps }     from './FormTextarea'

export { default as Toast }           from './Toast'
export type { ToastProps, ToastVariant } from './Toast'

export { default as StatStrip }       from './StatStrip'
export type { StatStripProps, StatItem } from './StatStrip'

export { default as SectionHeader }   from './SectionHeader'
export type { SectionHeaderProps }    from './SectionHeader'

export { default as ImagePlaceholder } from './ImagePlaceholder'
export type { ImagePlaceholderProps, ImageRatio } from './ImagePlaceholder'

import { PieceProperty, PropertyType } from '@activepieces/pieces-framework'

import { MCPProperty, MCPProperyType } from '@activepieces/shared'
import { z } from 'zod' 


export const MAX_TOOL_NAME_LENGTH = 47

export function mcpPropertyToZod(property: MCPProperty): z.ZodTypeAny {
    let schema: z.ZodTypeAny

    switch (property.type) {
        case MCPProperyType.TEXT:
        case MCPProperyType.DATE:
            schema = z.string()
            break
        case MCPProperyType.NUMBER:
            schema = z.number()
            break
        case MCPProperyType.BOOLEAN:
            schema = z.boolean()
            break
        case MCPProperyType.ARRAY:
            schema = z.array(z.unknown())
            break
        case MCPProperyType.OBJECT:
            schema = z.record(z.string(), z.unknown())
            break
        default:
            schema = z.unknown()
    }

    if (property.description) {
        schema = schema.describe(property.description)
    }

    return property.required ? schema : schema.optional()
}

export function piecePropertyToZod(property: PieceProperty): z.ZodTypeAny {
    let schema: z.ZodTypeAny

    switch (property.type) {
        case PropertyType.SHORT_TEXT:
        case PropertyType.LONG_TEXT:
        case PropertyType.DATE_TIME:
            schema = z.string()
            break
        case PropertyType.NUMBER:
            schema = z.number()
            break
        case PropertyType.CHECKBOX:
            schema = z.boolean()
            break
        case PropertyType.ARRAY:
            schema = z.array(z.unknown())
            break
        case PropertyType.OBJECT:
        case PropertyType.JSON:
            schema = z.record(z.string(), z.unknown())
            break
        case PropertyType.MULTI_SELECT_DROPDOWN:
            schema = z.array(z.string())
            break
        case PropertyType.DROPDOWN:
            schema = z.string()
            break
        default:
            schema = z.unknown()
    }

    if (property.defaultValue) {
        schema = schema.default(property.defaultValue)
    }

    if (property.description) {
        schema = schema.describe(property.description)
    }

    return property.required ? schema : schema.optional()
}
"use client"

import { toast as sonnerToast } from "sonner"

// Wrapper so existing `useToast` calls still work
export function useToast() {
  return {
    toast: {
      success: (message: string) => sonnerToast.success(message),
      error: (message: string) => sonnerToast.error(message),
      info: (message: string) => sonnerToast(message),
      warning: (message: string) => sonnerToast.warning(message),
    },
  }
}

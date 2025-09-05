import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

export default function PleaseLogin() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-gray-300 bg-gradient-to-br from-yellow-50 to-white shadow-sm">
      <Lock className="w-12 h-12 text-primary mb-4" />
      <p className="text-2xl font-semibold text-gray-800 mb-2">
        Please login first
      </p>
      <p className="text-sm text-gray-500 mb-6 max-w-sm">
        You need to be logged in to access this feature.
      </p>
      <Link href="/login">
        <Button className="px-7 py-3 text-xl cursor-pointer rounded-xl bg-primary hover:bg-primary/90 text-white shadow-md">
          Login
        </Button>
      </Link>
    </div>
  )
}

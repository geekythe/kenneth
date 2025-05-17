import { cn } from "@/lib/utils"

interface DateBadgeProps {
  date: string
  className?: string
}

export default function DateBadge({ date, className }: DateBadgeProps) {
  return (
    <div className={cn("relative inline-block", className)}>
      <div className="relative inline-flex items-center bg-[#8ACB82] text-white font-semibold text-xs px-4 py-1">
        {date}
        {/* Arrow shape on left side */}
        <div className="absolute left-0 top-0 h-full w-2 flex items-center justify-center">
          <div className="w-0 h-0 border-y-[12px] border-y-transparent border-l-[12px] border-l-[#f0f3e6]"></div>
        </div>
      </div>
    </div>
  )
}

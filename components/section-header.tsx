import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  className?: string
}

export function SectionHeader({ title, className }: SectionHeaderProps) {
  return (
    <div className={cn("relative mb-12", className)}>
      <div className="relative z-10 inline-flex items-center">
        {/* Left Extension */}
        <div className="absolute left-[-15px] -top-2 w-6 h-full bg-[#75ad6f]/80 z-[-1]"></div>
        <div className="absolute left-[-2px] -top-2 -z-20 w-0 h-0 border-b-[12px] border-l-[12px] border-transparent border-b-[#5a8957]"></div>

        {/* Main header */}
        <div className="bg-[#8ACB82] text-white px-6 py-[3px]  z-10 uppercase text-[12px] font-extralight tracking-wider">
          {title}
        </div>

        {/* Right Extension */}
        <div className="absolute right-[-15px] top-2 w-6 h-full -z-2 bg-[#75ad6f]/80 z-[-1]"></div>
        <div className="absolute right-[-2px] -bottom-2 w-0 h-0 -z-20 border-t-[12px] border-r-[12px] border-transparent border-t-[#5a8957]"></div>
      </div>

      {/* Horizontal line */}
      <div className="absolute top-1/2 -z-10 transform -translate-y-1/2 left-0 right-0 h-[2px] bg-[#8ACB82]"></div>
    </div>
  )
}

export default SectionHeader

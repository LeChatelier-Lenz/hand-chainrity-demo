import { cn } from "../lib/utils"
import { ReactNode } from "react"

const MaxWidthWrapper = ({
    className,
    children
}: {
    className?: string
    children: ReactNode//如果未自动引入shift + ctrl + p重新加载页面，重写
}) => {
    return (
        <div className={cn("mx-auto w-full max-w-screen-xl px-2.5 md:px-20", className)}>
            {children}
        </div>)
}

export default MaxWidthWrapper


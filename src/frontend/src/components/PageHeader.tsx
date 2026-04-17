import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
  centered?: boolean;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  badge,
  className,
  centered = false,
  children,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "py-12 md:py-16 px-4",
        centered && "text-center",
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {badge && (
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-widest uppercase text-primary bg-primary/10 rounded-full border border-primary/20">
            {badge}
          </span>
        )}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground leading-tight mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </motion.div>
    </div>
  );
}

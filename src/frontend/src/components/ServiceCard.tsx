import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import { motion } from "motion/react";
import { useCartStore } from "../store/cart";
import type { Service } from "../types";

interface ServiceCardProps {
  service: Service;
  index?: number;
  className?: string;
}

export function ServiceCard({
  service,
  index = 0,
  className,
}: ServiceCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(service);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={cn("group", className)}
    >
      <Link
        to="/services/$slug"
        params={{ slug: service.slug }}
        data-ocid={`service.item.${index + 1}`}
        className="block rounded-xl overflow-hidden bg-card border border-border shadow-elegant hover:shadow-lifted transition-smooth"
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={service.imageUrl}
            alt={service.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-card/90 backdrop-blur-sm text-foreground border border-border/50 capitalize">
              {service.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display text-lg font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
            {service.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
            {service.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">
                Starting from
              </p>
              <p className="text-base font-semibold text-foreground">
                ₹{service.priceMin.toLocaleString("en-IN")}
                <span className="text-xs text-muted-foreground font-normal ml-1">
                  – ₹{service.priceMax.toLocaleString("en-IN")}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs">{service.deliveryDays} days</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs transition-smooth"
              onClick={handleAddToCart}
              data-ocid={`service.add_button.${index + 1}`}
            >
              Add to Cart
            </Button>
            <Button
              size="sm"
              className="flex-1 text-xs group/btn transition-smooth"
              asChild
            >
              <span className="flex items-center gap-1 justify-center">
                View Details
                <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
              </span>
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

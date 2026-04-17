import { Star } from "lucide-react";
import { motion } from "motion/react";
import { PageLoader } from "../components/LoadingSpinner";
import { PageHeader } from "../components/PageHeader";
import { useReviews } from "../hooks/use-backend";

export default function Reviews() {
  const { data: reviews, isLoading } = useReviews();

  return (
    <div>
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PageHeader
            title="Customer Reviews"
            subtitle="Hear what our customers say about their StitchCraft experience."
            badge="Testimonials"
            centered
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Avg rating */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="text-center bg-card rounded-2xl border border-border p-6 shadow-elegant">
            <p className="text-5xl font-display font-bold text-foreground mb-1">
              4.9
            </p>
            <div className="flex items-center gap-1 justify-center mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static star array
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Based on 2,500+ reviews
            </p>
          </div>
        </div>

        {isLoading ? (
          <PageLoader />
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            data-ocid="reviews.list"
          >
            {(reviews ?? []).map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                data-ocid={`reviews.item.${i + 1}`}
                className="bg-card rounded-xl border border-border p-6 shadow-elegant"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      // biome-ignore lint/suspicious/noArrayIndexKey: static star array
                      key={j}
                      className={`w-4 h-4 ${j < review.rating ? "fill-primary text-primary" : "text-border"}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">
                  "{review.comment}"
                </p>
                <div className="flex items-center gap-2 pt-3 border-t border-border">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                    {review.userName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {review.userName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Verified Customer
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

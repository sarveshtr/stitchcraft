import { Image as ImageIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { PageHeader } from "../components/PageHeader";

const CATEGORIES = ["All", "Women", "Men", "Kids", "Bridal", "Festive"];

const GALLERY_ITEMS = [
  {
    id: "1",
    title: "Blush Bridal Lehenga",
    category: "Bridal",
    imageUrl: "/assets/generated/gallery-1.jpg",
  },
  {
    id: "2",
    title: "Ivory Silk Blouse",
    category: "Women",
    imageUrl: "/assets/generated/gallery-2.jpg",
  },
  {
    id: "3",
    title: "Classic Sherwani",
    category: "Men",
    imageUrl: "/assets/generated/gallery-3.jpg",
  },
  {
    id: "4",
    title: "Floral Anarkali Suit",
    category: "Women",
    imageUrl: "/assets/generated/gallery-4.jpg",
  },
  {
    id: "5",
    title: "Kids Festive Wear",
    category: "Kids",
    imageUrl: "/assets/generated/gallery-5.jpg",
  },
  {
    id: "6",
    title: "Gold Embroidered Dupatta",
    category: "Festive",
    imageUrl: "/assets/generated/gallery-6.jpg",
  },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((g) => g.category === activeCategory);

  return (
    <div>
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PageHeader
            title="Design Gallery"
            subtitle="Get inspired by our portfolio of handcrafted creations."
            badge="Portfolio"
            centered
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 justify-center flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              data-ocid={`gallery.filter.${cat.toLowerCase()}.tab`}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-smooth ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-elegant"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={ImageIcon} title="No designs in this category" />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                data-ocid={`gallery.item.${i + 1}`}
                className="group rounded-xl overflow-hidden bg-card border border-border shadow-elegant hover:shadow-lifted transition-smooth"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/assets/images/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-smooth" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-foreground truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

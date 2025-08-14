import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "STREETWEAR",
    image: "/urban-streetwear-collection.png",
    href: "/categories/streetwear",
    description: "URBAN ESSENTIALS",
  },
  {
    name: "CASUAL",
    image: "/casual-comfortable-clothing.png",
    href: "/categories/casual",
    description: "EVERYDAY COMFORT",
  },
  {
    name: "FORMAL",
    image: "/formal-elegant-collection.png",
    href: "/categories/formal",
    description: "ELEVATED STYLE",
  },
  {
    name: "ACCESSORIES",
    image: "/trendy-accessories.png",
    href: "/categories/accessories",
    description: "COMPLETE THE LOOK",
  },
]

export function FeaturedCategories() {
  return (
    <section className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-black text-4xl md:text-6xl mb-6 text-white uppercase tracking-wider">COLLECTIONS</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">Curated styles for every moment</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link key={category.name} href={category.href}>
              <Card
                className="group cursor-pointer bg-transparent border-0 maxzone-slide-up overflow-hidden"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-64 md:h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <h3 className="font-black text-xl md:text-2xl text-white mb-2 uppercase tracking-wider">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-300 uppercase tracking-wide font-medium">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

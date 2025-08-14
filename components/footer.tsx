import Link from "next/link"
import { Instagram, Twitter, Facebook, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-black text-white py-20 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center">
                <span className="text-black font-black text-xl">M</span>
              </div>
              <span className="font-black text-2xl maxzone-text-glow">MAXZONE</span>
            </div>
            <p className="text-gray-400 leading-relaxed font-medium">
              Authentic streetwear for the culture. Premium quality meets urban style in every piece we create.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
                <Instagram className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
                <Twitter className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
                <Facebook className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-black text-lg mb-6 uppercase tracking-wider">SHOP</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products"
                  className="text-gray-400 hover:text-white transition-colors font-medium uppercase tracking-wide"
                >
                  ALL PRODUCTS
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/streetwear"
                  className="text-gray-400 hover:text-white transition-colors font-medium uppercase tracking-wide"
                >
                  STREETWEAR
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/casual"
                  className="text-gray-400 hover:text-white transition-colors font-medium uppercase tracking-wide"
                >
                  CASUAL
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/formal"
                  className="text-gray-400 hover:text-white transition-colors font-medium uppercase tracking-wide"
                >
                  FORMAL
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/accessories"
                  className="text-gray-400 hover:text-white transition-colors font-medium uppercase tracking-wide"
                >
                  ACCESSORIES
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-black text-lg mb-6 uppercase tracking-wider">SUPPORT</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors font-medium uppercase tracking-wide"
                >
                  CONTACT
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-400 hover:text-white transition-colors font-medium uppercase tracking-wide"
                >
                  SHIPPING
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-400 hover:text-white transition-colors font-medium uppercase tracking-wide"
                >
                  RETURNS
                </Link>
              </li>
              <li>
                <Link
                  href="/size-guide"
                  className="text-gray-400 hover:text-white transition-colors font-medium uppercase tracking-wide"
                >
                  SIZE GUIDE
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-white transition-colors font-medium uppercase tracking-wide"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-black text-lg mb-6 uppercase tracking-wider">STAY UPDATED</h3>
            <p className="text-gray-400 mb-6 font-medium">Get the latest drops and exclusive access.</p>
            <div className="flex space-x-2">
              <Input
                placeholder="EMAIL ADDRESS"
                className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 rounded-none font-medium"
              />
              <Button className="bg-white text-black hover:bg-gray-200 rounded-none px-6">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm font-medium">© 2024 MAXZONE. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-white text-sm transition-colors font-medium uppercase tracking-wide"
            >
              PRIVACY
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white text-sm transition-colors font-medium uppercase tracking-wide"
            >
              TERMS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

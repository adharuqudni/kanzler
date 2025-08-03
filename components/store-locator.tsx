"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Clock } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const stores = [
  {
    id: 1,
    name: "Superindo Kemang",
    address: "Jl. Kemang Raya No. 66, Jakarta Selatan",
    phone: "+62 21 7179 2000",
    hours: "Mon-Sun: 8am-10pm",
    coordinates: { lat: -6.2601, lng: 106.8131 },
  },
  {
    id: 2,
    name: "Foodhall Grand Indonesia",
    address: "Grand Indonesia Mall, East Mall LG Floor, Jakarta Pusat",
    phone: "+62 21 2358 1111",
    hours: "Mon-Sun: 10am-10pm",
    coordinates: { lat: -6.1952, lng: 106.8214 },
  },
  {
    id: 3,
    name: "Ranch Market Oakwood",
    address: "Oakwood Premier Cozmo, Jl. DR Ide Anak Agung Gde Agung, Jakarta Selatan",
    phone: "+62 21 2553 9888",
    hours: "Mon-Sun: 8am-10pm",
    coordinates: { lat: -6.2241, lng: 106.8432 },
  },
  {
    id: 4,
    name: "Hypermart Lippo Mall Puri",
    address: "Lippo Mall Puri, Jl. Puri Indah Raya, Jakarta Barat",
    phone: "+62 21 2258 5500",
    hours: "Mon-Sun: 10am-10pm",
    coordinates: { lat: -6.1866, lng: 106.7342 },
  },
]

export default function StoreLocator() {
  const [activeStore, setActiveStore] = useState(stores[0])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-3xl font-heading mb-4">Where to Buy</h2>
        <p className="text-muted-foreground mb-6">
          Find Kanzler products at these locations and many more supermarkets across Indonesia.
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Store Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="map" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="map">Map</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>
              <TabsContent value="map" className="mt-4">
                <div className="aspect-video bg-muted rounded-md overflow-hidden relative">
                  {/* Map would be implemented here with a proper map library */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-muted-foreground">Interactive map would be displayed here</p>
                  </div>

                  {/* Placeholder for map pins */}
                  {stores.map((store) => (
                    <motion.div
                      key={store.id}
                      className="absolute"
                      style={{
                        top: `${Math.random() * 80 + 10}%`,
                        left: `${Math.random() * 80 + 10}%`,
                      }}
                      whileHover={{ scale: 1.2 }}
                      onClick={() => setActiveStore(store)}
                    >
                      <MapPin className="h-6 w-6 text-kanzler-gold" />
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 p-4 border rounded-md">
                  <h3 className="font-medium text-lg">{activeStore.name}</h3>
                  <div className="mt-2 space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <span>{activeStore.address}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <span>{activeStore.phone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <span>{activeStore.hours}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="list" className="mt-4 space-y-4">
                {stores.map((store) => (
                  <Card key={store.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg">{store.name}</h3>
                      <div className="mt-2 space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <span>{store.address}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <span>{store.phone}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <span>{store.hours}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

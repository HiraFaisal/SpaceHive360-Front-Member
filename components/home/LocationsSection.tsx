"use client"

import { useState, useMemo, useEffect } from "react"
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api"
import { motion } from "framer-motion"
import { MapPin, Navigation, Building2 } from "lucide-react"
import { memberApi } from "@/lib/api"

const mapContainerStyle = {
  width: "100%",
  height: "600px",
  borderRadius: "32px"
}

const defaultCenter = {
  lat: 24.8607, // Karachi default if no locations
  lng: 67.0011
}

const options = {
  disableDefaultUI: false,
  zoomControl: true,
  styles: [
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ saturation: 36 }, { color: "#333333" }, { lightness: 40 }]
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [{ visibility: "on" }, { color: "#ffffff" }, { lightness: 16 }]
    },
    {
      featureType: "administrative",
      elementType: "geometry.fill",
      stylers: [{ color: "#fefefe" }, { lightness: 20 }]
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }, { lightness: 20 }]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
    }
  ]
}

export function LocationsSection() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  })

  const [locations, setLocations] = useState<any[]>([])
  const [stats, setStats] = useState({ activeCompanies: 0, totalLocations: 0 })
  const [selectedMarker, setSelectedMarker] = useState<any>(null)
  const [map, setMap] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [locRes, statRes] = await Promise.all([
          memberApi.getLocations(),
          memberApi.getStats()
        ])
        
        if (locRes.data.success) {
          // Deduplicate locations by coordinates or address
          const uniqueLocations = new Map();
          locRes.data.data.forEach((loc: any) => {
            const key = (loc.latitude && loc.longitude) 
              ? `${loc.latitude}_${loc.longitude}` 
              : (loc.address || loc.name);
            
            if (!uniqueLocations.has(key)) {
              uniqueLocations.set(key, {
                ...loc,
                lat: loc.latitude ? parseFloat(loc.latitude) : null,
                lng: loc.longitude ? parseFloat(loc.longitude) : null
              });
            }
          });
          setLocations(Array.from(uniqueLocations.values()));
        }

        if (statRes.data.success) {
          setStats(statRes.data.data);
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Dynamic center based on available locations
  const mapCenter = useMemo(() => {
    const validLoc = locations.find(l => l.lat && l.lng);
    return validLoc ? { lat: validLoc.lat, lng: validLoc.lng } : defaultCenter;
  }, [locations]);

  const onLoad = (map: any) => {
    setMap(map)
  }

  const onUnmount = () => {
    setMap(null)
  }

  return (
    <section id="locations" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-4 flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4" />
              Our Global Presence
            </h2>
            <p className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">
              Find a Hive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">wherever you go.</span>
            </p>
            <p className="text-gray-500 font-medium leading-relaxed">
              Explore our vast network of premium coworking spaces across the city. 
              Each location is verified for quality and equipped with state-of-the-art facilities.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[40px] border border-gray-100 shadow-2xl shadow-blue-600/5 bg-gray-50 p-4"
        >
          {isLoaded && !loading ? (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={12}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={options}
            >
              {locations.filter(l => l.lat && l.lng).map((loc) => (
                <MarkerF
                  key={loc.recId}
                  position={{ lat: loc.lat, lng: loc.lng }}
                  onClick={() => setSelectedMarker(loc)}
                  icon={{
                    url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    scaledSize: new window.google.maps.Size(40, 40)
                  }}
                />
              ))}

              {selectedMarker && (
                <InfoWindowF
                  position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div className="p-2 min-w-[200px]">
                    <p className="font-black text-blue-600 text-xs uppercase tracking-widest mb-1">Workspace</p>
                    <h4 className="font-bold text-gray-900 text-sm mb-2">{selectedMarker.name}</h4>
                    <p className="text-gray-500 text-[10px] flex items-center gap-1 mb-3">
                      <MapPin className="w-3 h-3" />
                      {selectedMarker.address || "Address available on request"}
                    </p>
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-1.5 bg-blue-600 text-white text-[10px] font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                      <button className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <Navigation className="w-3 h-3 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </InfoWindowF>
              )}
            </GoogleMap>
          ) : (
            <div className="w-full h-[600px] bg-gray-100 animate-pulse rounded-[32px] flex items-center justify-center">
              <p className="text-gray-400 font-bold">
                {loading ? "Fetching Hive Locations..." : "Loading SpaceHive Maps..."}
              </p>
            </div>
          )}
          
          {/* Legend Overlay */}
          <div className="absolute bottom-10 left-10 hidden md:block">
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl min-w-[200px]">
              <h5 className="font-black text-gray-900 text-xs uppercase tracking-widest mb-4">Network Overview</h5>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-blue-100 rounded-md">
                      <Building2 className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">Total Companies</span>
                  </div>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-[10px] font-black">{stats.activeCompanies}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

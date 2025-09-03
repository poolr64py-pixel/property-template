'use client';

import { motion } from 'framer-motion';
import { propertyConfig } from '@/config/property.config';
import { MapPin, Navigation, Clock, Coffee, Car, ShoppingBag } from 'lucide-react';

export default function Location() {
  const { location, title } = propertyConfig;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4"
        >
          Localização
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-gray-600 mb-12"
        >
          Localizado em uma região privilegiada da cidade
        </motion.p>

        {/* Endereço principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-2xl shadow-lg mb-8 max-w-2xl mx-auto"
        >
          <MapPin className="w-12 h-12 mx-auto mb-4 text-accent" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{location.address}</h3>
          <p className="text-lg text-gray-600">
            {location.city}, {location.state} - {location.country}
          </p>
          <p className="text-gray-500 mt-2">CEP: {location.zipCode}</p>
        </motion.div>

        {/* Pontos de interesse */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8"
        >
          <div className="text-center">
            <div className="bg-white p-4 rounded-lg shadow-md mb-2">
              <ShoppingBag className="w-6 h-6 mx-auto text-primary" />
            </div>
            <h4 className="font-semibold text-gray-900">Shopping</h4>
            <p className="text-sm text-gray-600">5 min</p>
          </div>

          <div className="text-center">
            <div className="bg-white p-4 rounded-lg shadow-md mb-2">
              <Coffee className="w-6 h-6 mx-auto text-secondary" />
            </div>
            <h4 className="font-semibold text-gray-900">Restaurantes</h4>
            <p className="text-sm text-gray-600">2 min</p>
          </div>

          <div className="text-center">
            <div className="bg-white p-4 rounded-lg shadow-md mb-2">
              <Car className="w-6 h-6 mx-auto text-accent" />
            </div>
            <h4 className="font-semibold text-gray-900">Centro</h4>
            <p className="text-sm text-gray-600">10 min</p>
          </div>

          <div className="text-center">
            <div className="bg-white p-4 rounded-lg shadow-md mb-2">
              <Navigation className="w-6 h-6 mx-auto text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Aeroporto</h4>
            <p className="text-sm text-gray-600">20 min</p>
          </div>
        </motion.div>

        {/* Mapa placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto"
        >
          <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">Mapa interativo aqui</p>
              <p className="text-sm text-gray-400 mt-2">
                Coordenadas: {location.coordinates.lat}, {location.coordinates.lng}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
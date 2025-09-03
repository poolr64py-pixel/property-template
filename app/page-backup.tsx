'use client';

import { motion } from 'framer-motion';
import { propertyConfig } from '@/config/property.config';
import { 
  MapPin, Bed, Bath, Car, Maximize, Calendar, Home, 
  Phone, Mail, MessageCircle, User, Clock, Navigation,
  Coffee, ShoppingBag, Star, Check, ArrowRight, Heart
} from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';

export default function PropertyPage() {
  const { title, subtitle, description, price, location, features, images, amenities, agent } = propertyConfig;

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency === 'USD' ? 'USD' : 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no imóvel: ${title}. Gostaria de agendar uma visita.`
    );
    const whatsappNumber = agent.whatsapp?.replace(/[^\d]/g, '');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900">{agent.name}</span>
          </div>
          <button 
            onClick={handleWhatsAppClick}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full flex items-center space-x-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <OptimizedImage
          src={images.hero}
          alt={title}
          fill
          priority
          quality={95}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-100">
              {subtitle}
            </p>
            
            <div className="flex items-center justify-center mb-8 text-lg">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{location.address}, {location.city}</span>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md mx-auto mb-8">
              {price.sale && (
                <div className="mb-4">
                  <div className="text-sm text-gray-300 mb-2">Preço de Venda</div>
                  <div className="text-4xl font-bold text-yellow-400">
                    {formatPrice(price.sale, price.currency)}
                  </div>
                </div>
              )}
              {price.rent && (
                <div>
                  <div className="text-sm text-gray-300 mb-2">Aluguel Mensal</div>
                  <div className="text-2xl font-bold">
                    {formatPrice(price.rent, price.currency)}
                    <span className="text-lg text-gray-300">/mês</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={handleWhatsAppClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                Agendar Visita
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/30 hover:bg-white/30 transition-all"
              >
                Ver Detalhes
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Property Stats */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Bed, value: features.bedrooms, label: 'Dormitórios' },
              { icon: Bath, value: features.bathrooms, label: 'Banheiros' },
              { icon: Maximize, value: `${features.area} ${features.areaUnit}`, label: 'Área Total' },
              { icon: Car, value: features.parking, label: 'Vagas' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Sobre o Imóvel</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              {description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl">
                <Calendar className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <div className="font-semibold text-gray-900">Construído em</div>
                <div className="text-blue-600 font-bold">{features.yearBuilt}</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl">
                <Home className="w-8 h-8 mx-auto mb-3 text-green-600" />
                <div className="font-semibold text-gray-900">Tipo</div>
                <div className="text-green-600 font-bold capitalize">Apartamento</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-yellow-100 rounded-xl">
                <Star className="w-8 h-8 mx-auto mb-3 text-orange-600" />
                <div className="font-semibold text-gray-900">Condição</div>
                <div className="text-orange-600 font-bold">Novo</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Galeria de Fotos</h2>
            <p className="text-xl text-gray-600">Conheça cada detalhe do seu futuro lar</p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {images.gallery.slice(0, 8).map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
              >
                <OptimizedImage
                  src={image}
                  alt={`Foto ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comodidades</h2>
            <p className="text-xl text-gray-600">Tudo que você precisa para viver com conforto</p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 bg-gray-50 p-4 rounded-xl hover:bg-blue-50 transition-colors"
              >
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-800 text-sm">{amenity}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Localização Privilegiada</h2>
            <p className="text-xl text-gray-300">No coração de {location.city}</p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl text-gray-900 mb-8 text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-2xl font-bold mb-2">{location.address}</h3>
              <p className="text-lg text-gray-600">{location.city}, {location.state} - CEP: {location.zipCode}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: ShoppingBag, label: 'Shopping', time: '5 min' },
                { icon: Coffee, label: 'Restaurantes', time: '2 min' },
                { icon: Navigation, label: 'Centro', time: '10 min' },
                { icon: MapPin, label: 'Aeroporto', time: '20 min' }
              ].map((poi, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center bg-white/10 p-6 rounded-xl backdrop-blur-sm"
                >
                  <poi.icon className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                  <div className="font-semibold mb-1">{poi.label}</div>
                  <div className="text-blue-400 font-bold">{poi.time}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Pronto para Conhecer?</h2>
            <p className="text-xl mb-8 text-blue-100">Entre em contato e agende sua visita hoje mesmo</p>
            
            <div className="max-w-md mx-auto mb-12">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
                <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{agent.name}</h3>
                <p className="text-blue-100 mb-4">Corretor Especializado</p>
                <div className="text-blue-200">{location.city}, {location.state}</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
              <motion.a
                href={`tel:${agent.phone}`}
                whileHover={{ scale: 1.05 }}
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>Ligar Agora</span>
              </motion.a>
              
              <motion.button
                onClick={handleWhatsAppClick}
                whileHover={{ scale: 1.05 }}
                className="bg-green-500 px-8 py-4 rounded-full font-semibold flex items-center justify-center space-x-2 hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 {agent.name}. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
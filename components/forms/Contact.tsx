'use client';

import { motion } from 'framer-motion';
import { propertyConfig } from '@/config/property.config';
import { Phone, Mail, MessageCircle, User, Clock, MapPin } from 'lucide-react';

export default function Contact() {
  const { agent, location } = propertyConfig;

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no imóvel: ${propertyConfig.title}. Gostaria de agendar uma visita.`
    );
    const whatsappNumber = agent.whatsapp?.replace(/[^\d]/g, '');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4"
        >
          Entre em Contato
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-gray-600 mb-12"
        >
          Agende sua visita ou tire suas dúvidas conosco
        </motion.p>

        {/* Informações do corretor */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary to-secondary p-8 rounded-2xl text-white mb-8 max-w-2xl mx-auto"
        >
          {agent.photo && (
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
              <User className="w-10 h-10" />
            </div>
          )}
          <h3 className="text-2xl font-bold mb-2">{agent.name}</h3>
          <p className="text-white/90 mb-4">Corretor Especializado</p>
          <div className="flex items-center justify-center text-white/80">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{location.city}, {location.state}</span>
          </div>
        </motion.div>

        {/* Opções de contato */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
          {/* Telefone */}
          <motion.a
            href={`tel:${agent.phone}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary/20"
          >
            <Phone className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h4 className="font-bold text-gray-900 mb-2">Telefone</h4>
            <p className="text-gray-600 mb-2">{agent.phone}</p>
            <p className="text-sm text-gray-500">Clique para ligar</p>
          </motion.a>

          {/* Email */}
          <motion.a
            href={`mailto:${agent.email}?subject=Interesse no imóvel: ${propertyConfig.title}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-secondary/20"
          >
            <Mail className="w-12 h-12 mx-auto mb-4 text-secondary" />
            <h4 className="font-bold text-gray-900 mb-2">E-mail</h4>
            <p className="text-gray-600 mb-2 break-all">{agent.email}</p>
            <p className="text-sm text-gray-500">Clique para enviar</p>
          </motion.a>

          {/* WhatsApp */}
          {agent.whatsapp && (
            <motion.button
              onClick={handleWhatsAppClick}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-500/20"
            >
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <h4 className="font-bold text-gray-900 mb-2">WhatsApp</h4>
              <p className="text-gray-600 mb-2">{agent.whatsapp}</p>
              <p className="text-sm text-gray-500">Mensagem instantânea</p>
            </motion.button>
          )}
        </div>

        {/* Horário de atendimento */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="bg-gray-50 p-6 rounded-xl max-w-md mx-auto"
        >
          <Clock className="w-8 h-8 mx-auto mb-3 text-accent" />
          <h4 className="font-bold text-gray-900 mb-2">Horário de Atendimento</h4>
          <p className="text-gray-600 text-sm">Segunda a Sexta: 8h às 18h</p>
          <p className="text-gray-600 text-sm">Sábado: 8h às 12h</p>
        </motion.div>
      </div>
    </section>
  );
}
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, X } from 'lucide-react'
import { useEffect } from 'react'

interface ToastProps {
    message: string
    type: 'success' | 'error'
    onClose: () => void
    duration?: number
}

const Toast = ({ message, type, onClose, duration = 5000 }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, duration)

        return () => clearTimeout(timer)
    }, [duration, onClose])

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-8 right-8 z-50 flex items-center p-4 rounded-xl shadow-2xl border backdrop-blur-md min-w-[320px] ${type === 'success'
                    ? 'bg-green-500/10 border-green-500/20 text-green-400'
                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                }`}
        >
            <div className={`p-2 rounded-full mr-3 ${type === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                {type === 'success' ? (
                    <CheckCircle className="w-5 h-5" />
                ) : (
                    <XCircle className="w-5 h-5" />
                )}
            </div>

            <div className="flex-1 mr-4">
                <h4 className="font-bold text-sm mb-0.5">
                    {type === 'success' ? 'Başarılı' : 'Hata'}
                </h4>
                <p className="text-xs opacity-80">{message}</p>
            </div>

            <button
                onClick={onClose}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    )
}

export default Toast

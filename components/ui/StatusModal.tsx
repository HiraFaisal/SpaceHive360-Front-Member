"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, XCircle, ArrowRight, Loader2, Clock } from "lucide-react"

interface StatusModalProps {
    isOpen: boolean;
    status: 'success' | 'error' | 'loading' | 'pending' | null;
    message: string;
    onClose: () => void;
    actionLabel?: string;
    onAction?: () => void;
    showDismiss?: boolean;
}

export function StatusModal({ isOpen, status, message, onClose, actionLabel, onAction, showDismiss = true }: StatusModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={status !== 'loading' ? onClose : undefined}
                    className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-md bg-white rounded-[32px] p-10 shadow-2xl overflow-hidden"
                >
                    {/* Decorative Background Elements */}
                    <div className={`absolute top-0 left-0 w-full h-2 ${
                        status === 'success' ? 'bg-green-500' : 
                        status === 'error' ? 'bg-red-500' : 
                        status === 'pending' ? 'bg-blue-500' :
                        'bg-blue-600'
                    }`} />

                    <div className="flex flex-col items-center text-center space-y-6">
                        {/* Icon */}
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                            status === 'success' ? 'bg-green-50 text-green-500' : 
                            status === 'error' ? 'bg-red-50 text-red-500' : 
                            status === 'pending' ? 'bg-blue-50 text-blue-500' :
                            'bg-blue-50 text-blue-600'
                        }`}>
                            {status === 'success' && <CheckCircle2 className="w-10 h-10" />}
                            {status === 'error' && <XCircle className="w-10 h-10" />}
                            {status === 'loading' && <Loader2 className="w-10 h-10 animate-spin" />}
                            {status === 'pending' && <Clock className="w-10 h-10" />}
                        </div>

                        {/* Text */}
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-gray-900">
                                {status === 'success' ? 'Great News!' : 
                                 status === 'error' ? 'Oops, Something Failed' : 
                                 status === 'pending' ? 'Proof Submitted!' :
                                 'Processing...'}
                            </h3>
                            <p className="text-gray-500 font-medium leading-relaxed">
                                {message}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        {status !== 'loading' && (
                            <div className="w-full pt-4 space-y-3">
                                {onAction && (
                                    <button 
                                        onClick={onAction}
                                        className={`w-full py-4 rounded-2xl font-bold text-sm text-white transition-all shadow-xl flex items-center justify-center gap-2 ${
                                            status === 'success' ? 'bg-green-600 shadow-green-600/20 hover:bg-green-700' : 
                                            'bg-blue-600 shadow-blue-600/20 hover:bg-blue-700'
                                        }`}
                                    >
                                        {actionLabel || 'Continue'} <ArrowRight className="w-4 h-4" />
                                    </button>
                                )}
                                {showDismiss && (
                                    <button 
                                        onClick={onClose}
                                        className="w-full py-4 rounded-2xl font-bold text-sm text-gray-400 hover:text-gray-600 transition-all"
                                    >
                                        Dismiss
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

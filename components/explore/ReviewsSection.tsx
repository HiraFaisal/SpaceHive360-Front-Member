"use client"

import { useState, useEffect } from "react"
import { Star, MessageSquare, Send, Calendar, User, ChevronDown, ChevronUp, CheckCircle2, ThumbsUp, Flag, MoreVertical } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { feedbackApi, aiApi } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"

interface ReviewsSectionProps {
    planId: string;
    planType: string;
    companyId?: string;
}

export function ReviewsSection({ planId, planType, companyId }: ReviewsSectionProps) {
    const { user, isAuthenticated } = useAuth()
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const [hover, setHover] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [summary, setSummary] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [viewMode, setViewMode] = useState<"recent" | "all">("recent")
    const [showForm, setShowForm] = useState(false)

    const fetchFeedbacks = async () => {
        setLoading(true)
        try {
            let res;
            if (planType === "Booking") {
                res = await feedbackApi.getFeedbackByBooking(planId)
            } else {
                res = await feedbackApi.getFeedbackByMembership(planId)
            }
            setSummary(res.data.data)
        } catch (error) {
            console.error("Failed to fetch feedbacks:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFeedbacks()
    }, [planId, planType])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isAuthenticated) return
        if (rating === 0) return

        setIsSubmitting(true)
        try {
            // Call AI Sentiment Analysis directly from frontend
            let sentiment = "neutral";
            let score = 0.5;
            
            try {
                const aiRes = await aiApi.analyzeSentiment(comment);
                sentiment = aiRes.data.label;
                score = aiRes.data.score;
            } catch (aiError) {
                console.error("AI Service failed, using defaults:", aiError);
            }

            await feedbackApi.submitFeedback({
                planBookingId: planType === "Booking" ? planId : null,
                planMembershipId: planType === "Membership" ? planId : null,
                rating,
                comment,
                userId: user?.userId,
                companyId: companyId,
                sentiment,
                sentimentScore: score
            })
            setComment("")
            setRating(0)
            setShowForm(false)
            fetchFeedbacks()
        } catch (error) {
            console.error("Failed to submit feedback:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const feedbacks = summary?.feedbacks || []
    const filteredFeedbacks = viewMode === "recent" ? feedbacks.slice(0, 3) : feedbacks

    return (
        <div className="max-w-4xl mx-auto space-y-12 py-8">
            {/* Summary Header */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-gray-100 pb-12">
                <div className="md:col-span-5 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">Member Reviews</h3>
                    <p className="text-sm text-gray-500 font-medium mb-6">Real member experiences and feedback.</p>
                    
                    <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-bold text-gray-900 leading-none">{summary?.averageRating || "0.0"}</span>
                            <span className="text-lg font-semibold text-gray-400">/ 5.0</span>
                        </div>
                        <div className="flex items-center gap-1 my-3">
                            {[1, 2, 3, 4, 5].map(s => (
                                <Star 
                                    key={s} 
                                    className={`w-4 h-4 ${s <= (summary?.averageRating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-100"}`} 
                                />
                            ))}
                        </div>
                        <p className="text-xs font-semibold text-gray-600">Based on {summary?.totalReviews || 0} reviews</p>
                    </div>
                </div>

                <div className="md:col-span-7 space-y-2.5">
                    {[5, 4, 3, 2, 1].map((num) => {
                        const count = summary?.[`ratingCount${num}`] || 0;
                        const percentage = summary?.totalReviews > 0 ? (count / summary.totalReviews) * 100 : 0;
                        return (
                            <div key={num} className="flex items-center gap-3">
                                <span className="text-[10px] font-bold text-gray-400 w-3">{num}</span>
                                <div className="flex-1 h-1.5 bg-gray-50 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${percentage}%` }}
                                        className="h-full bg-gray-900 rounded-full"
                                    />
                                </div>
                                <span className="text-[10px] font-bold text-gray-500 w-8 text-right">{Math.round(percentage)}%</span>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Submission Section */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                {!showForm ? (
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                <User className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="text-left">
                                <h4 className="text-sm font-bold text-gray-900">Add your review</h4>
                                <p className="text-xs text-gray-500 font-medium">What was your experience like?</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setShowForm(true)}
                            className="px-6 py-2.5 rounded-xl bg-gray-900 text-white font-bold text-xs hover:bg-black transition-all active:scale-[0.98]"
                        >
                            Write Review
                        </button>
                    </div>
                ) : (
                    <motion.form 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleSubmit} 
                        className="space-y-6"
                    >
                        <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Share your experience</h4>
                            <button 
                                onClick={() => setShowForm(false)}
                                type="button"
                                className="text-[10px] font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase"
                            >
                                Cancel
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Your Rating</p>
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHover(star)}
                                            onMouseLeave={() => setHover(0)}
                                            className="focus:outline-none transition-transform active:scale-110"
                                        >
                                            <Star
                                                className={`w-7 h-7 ${
                                                    (hover || rating) >= star
                                                        ? "text-yellow-400 fill-yellow-400"
                                                        : "text-gray-100"
                                                } transition-colors`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="relative">
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write your message..."
                                    className="w-full p-4 rounded-xl bg-gray-50 border-none text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/10 transition-all min-h-[120px] resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting || rating === 0}
                                className="px-8 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Send className="w-3.5 h-3.5" />
                                )}
                                Post Review
                            </button>
                        </div>
                    </motion.form>
                )}
            </div>

            {/* Review List */}
            <div className="space-y-8">
                <div className="flex items-center gap-6 border-b border-gray-100">
                    <button 
                        onClick={() => setViewMode("recent")}
                        className={`text-[11px] font-bold uppercase tracking-[0.1em] transition-all relative pb-4 ${
                            viewMode === "recent" ? "text-gray-900" : "text-gray-400"
                        }`}
                    >
                        Sort by Recent
                        {viewMode === "recent" && <motion.div layoutId="navLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />}
                    </button>
                    <button 
                        onClick={() => setViewMode("all")}
                        className={`text-[11px] font-bold uppercase tracking-[0.1em] transition-all relative pb-4 ${
                            viewMode === "all" ? "text-gray-900" : "text-gray-400"
                        }`}
                    >
                        All Reviews ({feedbacks.length})
                        {viewMode === "all" && <motion.div layoutId="navLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />}
                    </button>
                </div>

                {loading ? (
                    <div className="space-y-10">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex gap-4 animate-pulse">
                                <div className="w-10 h-10 rounded-full bg-gray-100 shrink-0" />
                                <div className="flex-1 space-y-3">
                                    <div className="h-3 w-32 bg-gray-100 rounded" />
                                    <div className="h-16 w-full bg-gray-50 rounded-xl" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : feedbacks.length === 0 ? (
                    <div className="py-20 text-center bg-gray-50/30 rounded-2xl border border-dashed border-gray-100">
                        <MessageSquare className="w-10 h-10 text-gray-200 mx-auto mb-4" />
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">No feedback yet</p>
                    </div>
                ) : (
                    <div className="space-y-10">
                        <AnimatePresence mode="popLayout">
                            {filteredFeedbacks.map((item: any) => (
                                <motion.div
                                    key={item.recId}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex gap-4 group"
                                >
                                    {/* Avatar */}
                                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">
                                        {item.userName ? item.userName.charAt(0) : "A"}
                                    </div>

                                    {/* Content Wrapper */}
                                    <div className="flex-1 space-y-2">
                                        {/* Header Info */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[13px] font-bold text-gray-900">@{item.userName?.replace(/\s+/g, '').toLowerCase() || "member"}</span>
                                                <span className="text-[11px] font-medium text-gray-400">
                                                    {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                            </div>
                                            <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded-full">
                                                <MoreVertical className="w-4 h-4 text-gray-400" />
                                            </button>
                                        </div>

                                        {/* Stars */}
                                        <div className="flex items-center gap-0.5">
                                            {[1, 2, 3, 4, 5].map(s => (
                                                <Star 
                                                    key={s} 
                                                    className={`w-2.5 h-2.5 ${s <= (item.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-100"}`} 
                                                />
                                            ))}
                                        </div>

                                        {/* The Message */}
                                        <div className="text-[14px] text-gray-700 leading-relaxed font-medium">
                                            {item.comment}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    )
}

'use client';

import { useState, useEffect } from 'react';
import { Heart, MessageSquare, Share2, MoreHorizontal, Image as ImageIcon, Send } from 'lucide-react';
import { communityApi, API_BASE_URL } from '@/lib/api';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const TABS = ["All Posts", "Announcements", "Collaboration", "Introductions"];

export function CommunityFeed() {
  const [activeTab, setActiveTab] = useState(0);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedComments, setExpandedComments] = useState<string[]>([]);
  const [commentsData, setCommentsData] = useState<Record<string, any[]>>({});
  const [loadingComments, setLoadingComments] = useState<Record<string, boolean>>({});
  const [commentInput, setCommentInput] = useState<Record<string, string>>({});
  const { user } = useAuth();

  const STATIC_URL = API_BASE_URL.replace(/\/api\/?$/, "");

  const fetchPosts = async (tag?: string) => {
    setLoading(true);
    try {
      const res = await communityApi.getPosts(tag);
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const tag = activeTab === 0 ? undefined : TABS[activeTab];
    fetchPosts(tag);
  }, [activeTab]);

  const handleLike = async (postId: string) => {
    if (!user) {
      alert("Please login to interact with posts");
      return;
    }
    try {
      await communityApi.likePost(postId, user.userId);
      setPosts(prev => prev.map(p => {
        if (p.recId === postId) {
          return { 
            ...p, 
            likesCount: p.isLikedByMe ? p.likesCount - 1 : p.likesCount + 1, 
            isLikedByMe: !p.isLikedByMe 
          };
        }
        return p;
      }));
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  const toggleComments = async (postId: string) => {
    const isExpanded = expandedComments.includes(postId);
    if (isExpanded) {
      setExpandedComments(prev => prev.filter(id => id !== postId));
    } else {
      setExpandedComments(prev => [...prev, postId]);
      if (!commentsData[postId]) {
        fetchComments(postId);
      }
    }
  };

  const fetchComments = async (postId: string) => {
    setLoadingComments(prev => ({ ...prev, [postId]: true }));
    try {
      const res = await communityApi.getComments(postId);
      setCommentsData(prev => ({ ...prev, [postId]: res.data }));
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    } finally {
      setLoadingComments(prev => ({ ...prev, [postId]: false }));
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!user) {
      alert("Please login to comment");
      return;
    }
    const content = commentInput[postId];
    if (!content?.trim()) return;

    try {
      await communityApi.addComment({ postId, content }, user.userId);
      setCommentInput(prev => ({ ...prev, [postId]: "" }));
      fetchComments(postId);
      // Update local count
      setPosts(prev => prev.map(p => {
        if (p.recId === postId) return { ...p, commentsCount: p.commentsCount + 1 };
        return p;
      }));
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-muted/50 backdrop-blur-sm rounded-2xl w-fit border border-border/40">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={cn(
              "px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
              activeTab === i
                ? "bg-card text-primary shadow-sm ring-1 ring-black/5 font-bold"
                : "text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-black/20"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="grid gap-6 pb-20">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
              <div className="h-8 w-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-sm font-medium animate-pulse">Gathering community updates...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border/50">
              <p className="text-muted-foreground font-medium">No community updates found in this category.</p>
            </div>
          ) : (
            posts.map((post) => (
              <motion.div
                key={post.recId}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
                      {post.authorInitials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-foreground">{post.authorName}</h4>
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider",
                          post.tagColor || "bg-muted text-muted-foreground border-border/50"
                        )}>
                          {post.tag}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                        {post.authorRole} • {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground p-2 rounded-xl hover:bg-muted transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-sm leading-relaxed text-foreground/90 mb-4 whitespace-pre-wrap">
                  {post.content}
                </p>

                {post.hasImage && post.imageUrl && (
                  <div className="rounded-2xl overflow-hidden border border-border/50 mb-4 shadow-sm bg-muted/20 aspect-video flex items-center justify-center">
                    <img 
                      src={post.imageUrl.startsWith('http') ? post.imageUrl : `${STATIC_URL}${post.imageUrl}`} 
                      alt="Post" 
                      className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700" 
                    />
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-6 pt-4 border-t border-border/30">
                    <button 
                      onClick={() => handleLike(post.recId)}
                      className={cn(
                        "flex items-center gap-2 text-sm font-bold transition-all active:scale-95",
                        post.isLikedByMe ? "text-primary scale-105" : "text-muted-foreground hover:text-primary"
                      )}
                    >
                      <Heart className={cn("h-4 w-4 transition-transform", post.isLikedByMe && "fill-current scale-110")} />
                      <span>{post.likesCount}</span>
                    </button>
                    <button 
                      onClick={() => toggleComments(post.recId)}
                      className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-all active:scale-95"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.commentsCount}</span>
                    </button>
                    <button className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-all ml-auto">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Comments Area */}
                  {expandedComments.includes(post.recId) && (
                    <div className="space-y-4 pt-4 border-t border-border/30 animate-in fade-in slide-in-from-top-2 duration-300">
                      {/* Input */}
                      <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0 border border-primary/20">
                          ME
                        </div>
                        <div className="flex-1 flex gap-2">
                          <input 
                            placeholder="Add a comment..."
                            value={commentInput[post.recId] || ""}
                            onChange={(e) => setCommentInput(prev => ({ ...prev, [post.recId]: e.target.value }))}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.recId)}
                            className="flex-1 bg-muted/30 border border-border/40 rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-primary/20 transition-all outline-none"
                          />
                          <button 
                            onClick={() => handleAddComment(post.recId)}
                            disabled={!commentInput[post.recId]?.trim()}
                            className="bg-primary text-primary-foreground p-2 rounded-xl hover:opacity-90 disabled:opacity-50 transition-all shadow-sm"
                          >
                            <Send className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      {/* Comments List */}
                      {loadingComments[post.recId] ? (
                        <div className="text-center py-4">
                          <div className="h-4 w-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
                        </div>
                      ) : (commentsData[post.recId]?.length || 0) === 0 ? (
                        <p className="text-[10px] text-center text-muted-foreground font-medium py-2">No comments yet. Be the first to join the discussion!</p>
                      ) : (
                        <div className="space-y-3 pl-2">
                          {commentsData[post.recId].map((comment: any) => (
                            <div key={comment.recId} className="flex gap-3 items-start">
                              <div className="h-7 w-7 rounded-lg bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground shrink-0 border border-border/50">
                                {comment.memberInitials}
                              </div>
                              <div className="flex-1 bg-muted/20 rounded-2xl p-3 border border-border/30">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[11px] font-bold text-foreground">{comment.memberName}</span>
                                  <span className="text-[9px] text-muted-foreground">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-xs text-foreground/80 leading-relaxed font-medium">{comment.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

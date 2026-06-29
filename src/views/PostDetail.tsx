import { useState, FormEvent } from 'react';
import { Post, Comment, Category } from '../types';
import { Calendar, Eye, Send, ArrowRight, User, MessageSquare, AlertCircle, Bookmark } from 'lucide-react';
import React from 'react';

// A lightweight, highly optimized Persian-friendly Markdown renderer
function parseMarkdownToReact(text: string) {
  if (!text) return null;
  
  // Split the text into lines
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  
  let inList = false;
  let listItems: string[] = [];
  let inOrderedList = false;
  let orderedItems: string[] = [];

  const flushLists = (key: string) => {
    if (inList && listItems.length > 0) {
      elements.push(
        <ul key={`ul-${key}`} className="list-disc list-inside mr-5 my-4 space-y-1.5 text-slate-700 dark:text-slate-300">
          {listItems.map((item, idx) => (
            <li key={`li-${idx}`} className="leading-relaxed">
              {parseInlineMarkdown(item)}
            </li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
    if (inOrderedList && orderedItems.length > 0) {
      elements.push(
        <ol key={`ol-${key}`} className="list-decimal list-inside mr-5 my-4 space-y-1.5 text-slate-700 dark:text-slate-300">
          {orderedItems.map((item, idx) => (
            <li key={`oli-${idx}`} className="leading-relaxed">
              {parseInlineMarkdown(item)}
            </li>
          ))}
        </ol>
      );
      orderedItems = [];
      inOrderedList = false;
    }
  };

  const parseInlineMarkdown = (inlineText: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    const regex = /(\*\*.*?\*\*|`.*?`)/g;
    const segments = inlineText.split(regex);
    
    segments.forEach((seg, idx) => {
      if (seg.startsWith('**') && seg.endsWith('**')) {
        parts.push(<strong key={idx} className="font-extrabold text-slate-900 dark:text-white">{seg.slice(2, -2)}</strong>);
      } else if (seg.startsWith('`') && seg.endsWith('`')) {
        parts.push(<code key={idx} className="font-mono text-xs bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded">{seg.slice(1, -1)}</code>);
      } else {
        parts.push(seg);
      }
    });
    return parts;
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    // Check list status
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      flushLists(index.toString());
      inList = true;
      listItems.push(trimmed.slice(2));
      return;
    }
    
    const numberedMatch = trimmed.match(/^(\d+)\.\s(.*)/);
    if (numberedMatch) {
      flushLists(index.toString());
      inOrderedList = true;
      orderedItems.push(numberedMatch[2]);
      return;
    }

    // If it's not a list item, flush any existing lists
    if (!trimmed.startsWith('- ') && !trimmed.startsWith('* ') && !numberedMatch) {
      if (trimmed !== '') {
        // Only flush if we have an empty line or block change
      } else {
        flushLists(index.toString());
        return; // Skip empty lines
      }
    }

    // Headers
    if (trimmed.startsWith('### ')) {
      flushLists(index.toString());
      elements.push(
        <h4 key={index} className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-6 mb-3 border-r-4 border-blue-500 pr-2">
          {parseInlineMarkdown(trimmed.slice(4))}
        </h4>
      );
    } else if (trimmed.startsWith('## ')) {
      flushLists(index.toString());
      elements.push(
        <h3 key={index} className="text-xl font-extrabold text-slate-900 dark:text-white mt-8 mb-4 border-r-4 border-blue-600 pr-2">
          {parseInlineMarkdown(trimmed.slice(3))}
        </h3>
      );
    } else if (trimmed.startsWith('# ')) {
      flushLists(index.toString());
      elements.push(
        <h2 key={index} className="text-2xl font-black text-slate-900 dark:text-white mt-10 mb-5 border-r-4 border-blue-600 pr-2.5">
          {parseInlineMarkdown(trimmed.slice(2))}
        </h2>
      );
    }
    // Blockquote
    else if (trimmed.startsWith('> ')) {
      flushLists(index.toString());
      elements.push(
        <blockquote key={index} className="border-r-4 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 pr-4 pl-3 py-3 my-4 rounded-l-xl text-slate-600 dark:text-slate-400 italic text-sm leading-relaxed">
          {parseInlineMarkdown(trimmed.slice(2))}
        </blockquote>
      );
    }
    // Horizontal divider
    else if (trimmed === '---' || trimmed === '***') {
      flushLists(index.toString());
      elements.push(
        <hr key={index} className="my-8 border-slate-200 dark:border-slate-800" />
      );
    }
    // Paragraph
    else if (trimmed !== '') {
      elements.push(
        <p key={index} className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed text-justify my-3">
          {parseInlineMarkdown(trimmed)}
        </p>
      );
    }
  });

  // Flush remaining lists
  flushLists('end');

  return <div className="space-y-4" id="parsed-markdown-content">{elements}</div>;
}

interface PostDetailProps {
  postSlug: string;
  posts: Post[];
  categories: Category[];
  comments: Comment[];
  onCommentSubmit: (comment: { postId: number; authorName: string; content: string }) => void;
  setCurrentView: (view: string) => void;
}

export default function PostDetail({
  postSlug,
  posts,
  categories,
  comments,
  onCommentSubmit,
  setCurrentView,
}: PostDetailProps) {
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  const post = posts.find((p) => p.slug === postSlug);
  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-slate-500" id="post-not-found">
        مقاله مورد نظر یافت نشد.
        <button onClick={() => setCurrentView('blog')} className="mt-4 block mx-auto text-blue-500 underline">بازگشت به وبلاگ</button>
      </div>
    );
  }

  const categoryName = categories.find((c) => c.id === post.categoryId)?.name || 'عمومی';
  const postComments = comments.filter((c) => c.postId === post.id && c.isApproved);

  const handleSubmitComment = (e: FormEvent) => {
    e.preventDefault();
    if (!authorName || !content) {
      alert('لطفاً نام و متن دیدگاه خود را وارد کنید.');
      return;
    }

    onCommentSubmit({
      postId: post.id,
      authorName,
      content,
    });

    setAuthorName('');
    setContent('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 5000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-fade-in" id="post-detail-view" dir="rtl">
      
      {/* Back button */}
      <button
        onClick={() => setCurrentView('blog')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 focus:outline-none cursor-pointer"
        id="post-back-btn"
      >
        <ArrowRight className="h-4 w-4" />
        <span>بازگشت به لیست مقالات</span>
      </button>

      {/* Main Post Card */}
      <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl" id="post-detail-card">
        {/* Banner Image */}
        <div className="relative h-64 sm:h-96 w-full bg-slate-100" id="post-detail-img-container">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            id="post-detail-banner-img"
          />
          <span className="absolute bottom-4 right-4 text-xs font-bold bg-blue-600 text-white px-3 py-1.5 rounded-lg shadow" id="post-detail-cat-badge">
            {categoryName}
          </span>
        </div>

        {/* Post Content */}
        <div className="p-6 sm:p-10 space-y-6 text-right" id="post-detail-body">
          {/* Metadata */}
          <div className="flex flex-wrap gap-4 items-center text-xs text-slate-400 font-mono border-b border-slate-100 dark:border-slate-800 pb-4" id="post-detail-meta">
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> انتشار: {post.createdAt}</span>
            <span className="flex items-center gap-1"><Eye className="h-4 w-4" /> {post.views} بازدید</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-snug" id="post-detail-title">
            {post.title}
          </h1>

          {/* Text body */}
          <div className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 text-justify font-sans" id="post-detail-text">
            {parseMarkdownToReact(post.content)}
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <section className="space-y-6" id="post-comments-section">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-r-4 border-blue-500 pr-2.5">
          <MessageSquare className="h-5 w-5 text-blue-500" />
          <span>دیدگاه‌های کاربران ({postComments.length})</span>
        </h3>

        {/* Comments list */}
        <div className="space-y-4" id="post-comments-list">
          {postComments.map((c) => (
            <div
              key={c.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-right space-y-2.5 shadow-sm"
              id={`comment-box-${c.id}`}
            >
              <div className="flex items-center justify-between text-xs" id={`comment-header-${c.id}`}>
                <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200" id={`comment-author-${c.id}`}>
                  <div className="h-7 w-7 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs">👤</div>
                  <span>{c.authorName}</span>
                </div>
                <span className="text-slate-400 font-mono">{c.createdAt}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pr-9" id={`comment-text-${c.id}`}>
                {c.content}
              </p>
            </div>
          ))}

          {postComments.length === 0 && (
            <div className="p-8 text-center text-sm text-slate-400 bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl" id="no-comments-msg">
              هیچ دیدگاهی برای این مقاله ثبت نشده است. اولین نفری باشید که نظر می‌دهد!
            </div>
          )}
        </div>

        {/* Comment Submission Form */}
        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 text-right" id="post-comment-form-container">
          <h4 className="font-bold text-slate-900 dark:text-white text-base">ثبت دیدگاه جدید</h4>
          <p className="text-xs text-slate-400">دیدگاه شما پس از بررسی و تایید توسط مدیریت در سایت نمایش داده خواهد شد. نیازی به ثبت‌نام یا لاگین نیست!</p>

          {commentSuccess && (
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2" id="comment-success-box">
              <AlertCircle className="h-4 w-4" />
              <span>دیدگاه شما با موفقیت ثبت شد و به بخش مدیریت ارسال شد.</span>
            </div>
          )}

          <form onSubmit={handleSubmitComment} className="space-y-4" id="post-comment-form">
            <div id="comment-author-field">
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">نام یا نام مستعار *</label>
              <div className="relative">
                <User className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="مثال: حمیدرضا علوی"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right"
                  id="comment-input-author"
                />
              </div>
            </div>

            <div id="comment-content-field">
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">متن دیدگاه شما *</label>
              <textarea
                required
                rows={4}
                placeholder="دیدگاه خود را اینجا بنویسید..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 text-right leading-relaxed"
                id="comment-input-content"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold rounded-xl shadow transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
              id="comment-submit-btn"
            >
              <Send className="h-4 w-4" />
              <span>ارسال دیدگاه</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

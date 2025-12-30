"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FaPencilAlt, FaTimes, FaCheck } from "react-icons/fa";
import Cropper, { Area } from "react-easy-crop";

export default function EditProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    status_text: "",
  });

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [finalBlob, setFinalBlob] = useState<Blob | null>(null);
  const [showCropper, setShowCropper] = useState(false);

  useEffect(() => {
    const fetchCurrentData = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          router.push("/login");
          return;
        }
        const res = await fetch("/api/external/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          const user = data.user || data;
          setFormData({
            name: user.name || "",
            bio: user.bio || "",
            status_text: user.status_text || "",
          });
          if (user.avatar_url) setPreviewUrl(user.avatar_url);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentData();
  }, [router]);

  const onCropComplete = useCallback((_croppedArea: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result as string);
        setShowCropper(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const createCroppedImage = async () => {
    try {
      if (!imageSrc || !croppedAreaPixels) return;

      const image = new Image();
      image.src = imageSrc;
      await new Promise((res) => (image.onload = res));

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      const base64Image = canvas.toDataURL("image/jpeg");
      setPreviewUrl(base64Image);

      canvas.toBlob((blob) => {
        if (blob) {
          setFinalBlob(blob);
          setShowCropper(false);
        }
      }, "image/jpeg");
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const token = localStorage.getItem("userToken");
      const data = new FormData();
      data.append("name", formData.name);
      data.append("status_text", formData.status_text);
      data.append("bio", formData.bio);

      if (finalBlob) {
        data.append("avatar", finalBlob, "avatar.jpg");
      }

      const res = await fetch("/api/external/profile/me", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Профиль успешно обновлен!" });
        setTimeout(() => router.push("/profile"), 1500);
      } else {
        throw new Error();
      }
    } catch {
      setMessage({ type: "error", text: "Не удалось сохранить данные" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#2EC4B6] font-bold">
        Загрузка...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-10 pb-20 relative">
      {showCropper && imageSrc && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4">
          <div className="relative w-full max-w-lg aspect-square bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="w-full max-w-lg mt-8 space-y-6 px-4">
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#2EC4B6]"
            />
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setShowCropper(false)}
                className="flex-1 py-4 bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-700 transition"
              >
                <FaTimes /> Отмена
              </button>
              <button
                type="button"
                onClick={createCroppedImage}
                className="flex-1 py-4 bg-[#2EC4B6] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-teal-600 transition shadow-lg shadow-teal-900/20"
              >
                <FaCheck /> Применить
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-6">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-[#2EC4B6] transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Назад в профиль
        </button>

        <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-100">
          <h1 className="text-3xl font-black text-gray-800 mb-8">Настройки профиля</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-6 mb-10 p-4 bg-slate-50 rounded-lg border border-dashed border-slate-200">
              <div className="relative w-24 h-24 shrink-0">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full rounded-full object-cover border-2 border-[#2EC4B6]"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-linear-to-br from-[#2EC4B6] to-teal-600 flex items-center justify-center text-white text-3xl font-bold">
                    {formData.name[0]?.toUpperCase()}
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 bg-white p-2 rounded-full shadow-md border border-slate-100 text-[#2EC4B6] hover:scale-110 transition"
                >
                  <FaPencilAlt className="w-4 h-4" />
                </button>
              </div>
              <div>
                <p className="font-bold text-gray-700">Фото профиля</p>
                <p className="text-xs text-slate-400 mt-1">Кликните на иконку для изменения.</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase ml-1">Никнейм</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2EC4B6]/20 focus:border-[#2EC4B6] transition"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase ml-1">Статус</label>
              <input
                type="text"
                value={formData.status_text}
                onChange={(e) => setFormData({ ...formData, status_text: e.target.value })}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2EC4B6]/20 focus:border-[#2EC4B6] transition"
                maxLength={50}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase ml-1">О себе</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2EC4B6]/20 focus:border-[#2EC4B6] transition min-h-[120px] resize-none"
              />
            </div>

            {message && (
              <div
                className={`p-4 rounded-2xl text-sm font-bold ${
                  message.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="pt-4 flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className={`flex-1 bg-[#2EC4B6] text-white py-4 rounded-lg font-black shadow-lg shadow-teal-100 hover:bg-teal-600 transition-all active:scale-95 flex items-center justify-center ${
                  saving ? "opacity-70" : ""
                }`}
              >
                {saving ? (
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  "Сохранить изменения"
                )}
              </button>
              <button
                type="button"
                onClick={() => router.push("/profile")}
                className="px-8 bg-slate-100 text-slate-500 py-4 rounded-lg font-bold hover:bg-slate-200 transition"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
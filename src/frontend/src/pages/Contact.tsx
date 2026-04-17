import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { PageHeader } from "../components/PageHeader";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PageHeader
            title="Contact Us"
            subtitle="Have questions? We'd love to hear from you. Reach out and we'll respond within 2 hours."
            badge="Get in Touch"
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-xl font-display font-semibold text-foreground mb-6">
              Get in Touch
            </h2>
            <div className="space-y-5">
              {[
                {
                  icon: MapPin,
                  label: "Visit Us",
                  value: "123 Fashion Street, Colaba, Mumbai - 400001",
                },
                { icon: Phone, label: "Call Us", value: "+91 98765 43210" },
                {
                  icon: Mail,
                  label: "Email Us",
                  value: "hello@stitchcraft.in",
                },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 shrink-0">
                    <c.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {c.label}
                    </p>
                    <p className="text-sm text-muted-foreground">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919876543210?text=Hello%20StitchCraft!"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="contact.whatsapp.link"
              className="mt-8 flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4 hover:bg-green-100 transition-smooth"
            >
              <MessageCircle className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-sm font-semibold text-green-800">
                  Chat on WhatsApp
                </p>
                <p className="text-xs text-green-600">
                  Instant replies during business hours
                </p>
              </div>
            </a>

            {/* Map placeholder */}
            <div className="mt-6 rounded-xl overflow-hidden border border-border aspect-video bg-muted/40 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  123 Fashion Street, Mumbai
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {submitted ? (
              <div className="text-center py-12">
                <p className="text-4xl mb-4">✉️</p>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground">
                  We'll get back to you within 2 hours.
                </p>
                <Button className="mt-6" onClick={() => setSubmitted(false)}>
                  Send Another
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-card rounded-xl border border-border p-6 shadow-elegant space-y-4"
                data-ocid="contact.form"
              >
                <h2 className="text-xl font-display font-semibold text-foreground mb-2">
                  Send a Message
                </h2>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    required
                    placeholder="Priya Sharma"
                    data-ocid="contact.name.input"
                    className="mt-1 transition-smooth"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="priya@example.com"
                    data-ocid="contact.email.input"
                    className="mt-1 transition-smooth"
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    required
                    placeholder="Service inquiry"
                    data-ocid="contact.subject.input"
                    className="mt-1 transition-smooth"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Tell us how we can help..."
                    data-ocid="contact.message.textarea"
                    className="mt-1 transition-smooth resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full shadow-elegant"
                  data-ocid="contact.submit.submit_button"
                >
                  Send Message
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

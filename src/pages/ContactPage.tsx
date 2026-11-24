import { useState } from 'react';
import { Check, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { SmartImage } from '@/components/SmartImage';

const heroImg = 'https://images.unsplash.com/photo-1600573472556-e636c2acda88?auto=format&fit=crop&w=1920&q=80';
const sideImg = 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1000&q=80';

const projectTypes = ['Residential', 'Commercial', 'Hospitality', 'Other'];
const productInterests = [
  'Composite Decking',
  'Timber Decking',
  'Architectural Cladding',
  'Balustrades',
  'Pergolas',
  'Complete Outdoor Solution',
  'Not Sure Yet',
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  productInterest: string;
  message: string;
};

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  projectType: '',
  productInterest: '',
  message: '',
};

export function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email.trim()) e.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email.';
    if (!form.message.trim()) e.message = 'Please tell us about your project.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let's create
            <br />
            <span className="font-serif italic font-light text-champagne normal-case tracking-normal">something exceptional.</span>
          </>
        }
        description="Tell us about your project and we'll help you select the right materials and solutions."
        image={heroImg}
      />

      <section className="bg-porcelain py-24 md:py-32">
        <div className="container-lux grid lg:grid-cols-2 gap-12 md:gap-20">
          {/* Left — info */}
          <Reveal>
            <p className="eyebrow mb-6">Get in Touch</p>
            <h2 className="heading-arch text-4xl md:text-5xl text-ink mb-8">
              Begin the
              <span className="font-serif italic font-light text-copper normal-case tracking-normal"> conversation.</span>
            </h2>
            <p className="text-base text-ink/70 leading-relaxed mb-10 max-w-md">
              Whether you're planning a residential terrace, a commercial development or a single feature
              wall, we're here to help you find the right materials for your vision.
            </p>

            <div className="relative aspect-[16/10] overflow-hidden mb-10 edge-light">
              <SmartImage src={sideImg} alt="Architectural outdoor space" className="h-full w-full" imgClassName="img-zoom" />
            </div>

            <div className="space-y-5 border-t border-ink/10 pt-8">
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-copper" strokeWidth={1.5} />
                <div>
                  <p className="text-[0.6rem] uppercase tracking-wider-2 text-ink/50">Phone</p>
                  <p className="text-sm text-ink/80">+27 00 000 0000</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-copper" strokeWidth={1.5} />
                <div>
                  <p className="text-[0.6rem] uppercase tracking-wider-2 text-ink/50">Email</p>
                  <p className="text-sm text-ink/80">hello@renodecks.example</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-copper" strokeWidth={1.5} />
                <div>
                  <p className="text-[0.6rem] uppercase tracking-wider-2 text-ink/50">Studio</p>
                  <p className="text-sm text-ink/80">By appointment — South Africa</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-ink/40 mt-8">
              Contact details shown are placeholders for this demonstration website.
            </p>
          </Reveal>

          {/* Right — form */}
          <Reveal delay="reveal-delay-2">
            <div className="bg-limestone p-8 md:p-10 border border-ink/10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center border border-copper rounded-full mb-6">
                    <Check className="h-8 w-8 text-copper" strokeWidth={1.5} />
                  </div>
                  <h3 className="heading-serif text-3xl text-ink mb-4">Preview Only</h3>
                  <p className="text-sm text-ink/60 mb-2 max-w-xs">
                    Your enquiry details were validated in this demonstration.
                  </p>
                  <p className="text-sm text-copper font-medium mb-8">
                    No enquiry has been sent.
                  </p>
                  <button
                    onClick={() => {
                      setForm(initialForm);
                      setSubmitted(false);
                    }}
                    className="btn-outline !border-ink/20 text-ink/70 !text-[0.65rem]"
                  >
                    Edit Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="heading-serif text-3xl text-ink mb-2">Project Enquiry</h3>
                  <p className="text-sm text-ink/50 mb-4">
                    Fields marked with * are required.
                  </p>

                  <div>
                    <label className="text-[0.6rem] uppercase tracking-wider-2 text-ink/50 block mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="input-lux"
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="text-xs text-copper mt-2">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="text-[0.6rem] uppercase tracking-wider-2 text-ink/50 block mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="input-lux"
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-xs text-copper mt-2">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="text-[0.6rem] uppercase tracking-wider-2 text-ink/50 block mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="input-lux"
                      placeholder="+27 00 000 0000"
                    />
                  </div>

                  <div>
                    <label className="text-[0.6rem] uppercase tracking-wider-2 text-ink/50 block mb-2">
                      Project Type
                    </label>
                    <select
                      value={form.projectType}
                      onChange={(e) => handleChange('projectType', e.target.value)}
                      className="input-lux cursor-pointer"
                    >
                      <option value="">Select a type...</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[0.6rem] uppercase tracking-wider-2 text-ink/50 block mb-2">
                      Product Interest
                    </label>
                    <select
                      value={form.productInterest}
                      onChange={(e) => handleChange('productInterest', e.target.value)}
                      className="input-lux cursor-pointer"
                    >
                      <option value="">Select an interest...</option>
                      {productInterests.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[0.6rem] uppercase tracking-wider-2 text-ink/50 block mb-2">
                      Message *
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      rows={4}
                      className="input-lux resize-none"
                      placeholder="Tell us about your project..."
                    />
                    {errors.message && <p className="text-xs text-copper mt-2">{errors.message}</p>}
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    Preview Enquiry <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </button>

                  <p className="text-[0.6rem] text-ink/40 leading-relaxed text-center">
                    Demonstration only — no enquiry will be sent and no information is stored.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

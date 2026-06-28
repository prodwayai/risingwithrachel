import React, { useState } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

type FormState = {
  name: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  preferredContact: string;
  goals: string;
  message: string;
  company: string; // honeypot
};

const EMPTY: FormState = {
  name: '', email: '', phone: '', location: '', experience: '',
  preferredContact: '', goals: '', message: '', company: '',
};

const EXPERIENCE_OPTIONS = [
  'New to running',
  'Recreational (run a few times a week)',
  'Regular racer (5K–half marathon)',
  'Marathoner',
  'Competitive / qualifying times',
];

const IntakeForm: React.FC = () => {
  const [data, setData] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.ok) throw new Error(body.error || 'Something went wrong. Please try again.');
      setStatus('success');
      setData(EMPTY);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-center py-5"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 12 }}
            className="d-inline-flex align-items-center justify-content-center mb-4"
            style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(37,99,235,0.1)' }}
          >
            <i className="bi bi-check-lg text-primary" style={{ fontSize: '2.5rem' }}></i>
          </motion.div>
          <h3 className="fw-bold mb-2">Thank you!</h3>
          <p className="text-muted mb-4">
            Your inquiry is on its way to Rachel. Check your inbox for a confirmation —
            she'll be in touch within a couple of days.
          </p>
          <Button variant="outline-primary" onClick={() => setStatus('idle')}>
            Send another inquiry
          </Button>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Form onSubmit={handleSubmit} noValidate>
            <input
              type="text" name="company" value={data.company} onChange={update('company')}
              tabIndex={-1} autoComplete="off"
              style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
              aria-hidden="true"
            />
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="rwr-name">
                  <Form.Label className="fw-medium">Name <span className="text-primary">*</span></Form.Label>
                  <Form.Control required value={data.name} onChange={update('name')} placeholder="Your full name" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="rwr-email">
                  <Form.Label className="fw-medium">Email <span className="text-primary">*</span></Form.Label>
                  <Form.Control required type="email" value={data.email} onChange={update('email')} placeholder="you@example.com" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="rwr-phone">
                  <Form.Label className="fw-medium">Phone</Form.Label>
                  <Form.Control type="tel" value={data.phone} onChange={update('phone')} placeholder="(optional)" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="rwr-location">
                  <Form.Label className="fw-medium">Location</Form.Label>
                  <Form.Control value={data.location} onChange={update('location')} placeholder="City, State" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="rwr-experience">
                  <Form.Label className="fw-medium">Running experience</Form.Label>
                  <Form.Select value={data.experience} onChange={update('experience')}>
                    <option value="">Select one…</option>
                    {EXPERIENCE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="rwr-contact">
                  <Form.Label className="fw-medium">Preferred contact</Form.Label>
                  <Form.Select value={data.preferredContact} onChange={update('preferredContact')}>
                    <option value="">No preference</option>
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                    <option value="Text">Text</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group controlId="rwr-goals">
                  <Form.Label className="fw-medium">What are your running goals?</Form.Label>
                  <Form.Control as="textarea" rows={2} value={data.goals} onChange={update('goals')}
                    placeholder="e.g. finish my first marathon, qualify for Boston, run injury-free…" />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group controlId="rwr-message">
                  <Form.Label className="fw-medium">Anything else?</Form.Label>
                  <Form.Control as="textarea" rows={3} value={data.message} onChange={update('message')}
                    placeholder="Tell me a little about yourself and how I can help." />
                </Form.Group>
              </Col>
            </Row>

            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="alert alert-danger mt-3 mb-0" role="alert"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="d-grid mt-4">
              <Button type="submit" size="lg" disabled={status === 'submitting'}>
                {status === 'submitting' ? (
                  <><Spinner animation="border" size="sm" className="me-2" />Sending…</>
                ) : 'Send my inquiry'}
              </Button>
            </div>
          </Form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntakeForm;

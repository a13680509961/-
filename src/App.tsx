import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Consult from '@/pages/Consult';
import Result from '@/pages/Result';
import Knowledge from '@/pages/Knowledge';
import KnowledgeDetail from '@/pages/KnowledgeDetail';
import History from '@/pages/History';
import Scales from '@/pages/Scales';
import ScaleDetail from '@/pages/ScaleDetail';
import Guidelines from '@/pages/Guidelines';
import GuidelineDetail from '@/pages/GuidelineDetail';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-neutral-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/consult" element={<Consult />} />
            <Route path="/result/:id" element={<Result />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/knowledge/:slug" element={<KnowledgeDetail />} />
            <Route path="/history" element={<History />} />
            <Route path="/scales" element={<Scales />} />
            <Route path="/scales/:id" element={<ScaleDetail />} />
            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="/guidelines/:id" element={<GuidelineDetail />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

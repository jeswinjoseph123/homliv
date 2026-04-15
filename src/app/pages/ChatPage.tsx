import { Navbar } from '../components/layout/Navbar';
import { ChatInterface } from '../components/shared/ChatInterface';

export function ChatPage() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex-1 overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  );
}

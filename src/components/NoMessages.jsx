import { MessageSquare } from "lucide-react";

const NoMessages = () => {
  return (
    <div className="flex flex-1 items-center justify-center h-[calc(100vh-18rem)] bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
          justify-center animate-bounce"
            >
              <MessageSquare className="w-8 h-8 text-primary " />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">No messages here!</h2>
        <p className="text-base-content/60">Start a conversation</p>
      </div>
    </div>
  );
};

export default NoMessages;

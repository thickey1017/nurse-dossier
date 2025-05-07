import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Edit, Send, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type OutreachMessage = {
  id: string;
  title: string;
  message: string;
};

interface OutreachMessagesProps {
  messages: OutreachMessage[];
  onEdit: (message: OutreachMessage) => void;
  onSend: (message: OutreachMessage) => void;
}

const OutreachMessages = ({ messages, onEdit, onSend }: OutreachMessagesProps) => {
  const [editingMessage, setEditingMessage] = useState<OutreachMessage | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  const handleEditClick = (message: OutreachMessage) => {
    setEditingMessage(message);
    setEditedTitle(message.title);
    setEditedContent(message.message);
  };

  const handleSave = () => {
    if (editingMessage) {
      const updatedMessage = {
        ...editingMessage,
        title: editedTitle.trim(),
        message: editedContent.trim(),
      };
      
      // Call onEdit with the updated message
      onEdit(updatedMessage);
      
      // Reset editing state
      setEditingMessage(null);
      setEditedTitle("");
      setEditedContent("");
    }
  };

  const handleCancel = () => {
    setEditingMessage(null);
    setEditedTitle("");
    setEditedContent("");
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <h2 className="font-medium text-nomad-black">Recommended Messages</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {messages.map((message) => (
          <Card key={message.id} className="rounded-none shadow-none border-0">
            <CardContent className="p-6 pb-2">
              {editingMessage?.id === message.id ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium text-nomad-black">
                      Title
                    </label>
                    <Input
                      id="title"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-nomad-black">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="w-full min-h-[100px]"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="font-medium text-nomad-black">{message.title}</h3>
                  <p className="text-sm text-nomad-darkGray">{message.message}</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="px-6 pb-4 pt-2 justify-end gap-2">
              {editingMessage?.id === message.id ? (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-nomad-blue text-nomad-blue hover:bg-nomad-lightBlue"
                    onClick={handleCancel}
                  >
                    <X className="mr-2 h-4 w-4" /> Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-nomad-blue hover:bg-nomad-darkBlue text-white"
                    onClick={() => onSend(message)}
                  >
                    <Send className="mr-2 h-4 w-4" /> Send
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-nomad-blue text-nomad-blue hover:bg-nomad-lightBlue"
                    onClick={() => handleEditClick(message)}
                  >
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-nomad-blue hover:bg-nomad-darkBlue text-white"
                    onClick={() => onSend(message)}
                  >
                    <Send className="mr-2 h-4 w-4" /> Send
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OutreachMessages;

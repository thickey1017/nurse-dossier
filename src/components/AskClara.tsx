import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

const AskClara = () => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleAsk = async () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    // TODO: Implement actual API call here
    setTimeout(() => {
      setIsLoading(false);
      setResponse("here's where a response would go.... if I had one");
    }, 2000);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <h2 className="font-medium text-nomad-black">Ask Clara</h2>
      </div>
      <div className="p-6 space-y-4">
        <Textarea
          placeholder={`Ask Clara anything about this clinician...

Clara has access to the clinician's actions on the site (e.g. job views, applications, etc.) and conversations from Zendesk.`}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="min-h-[100px] resize-none"
        />
        <div className="flex justify-end">
          <Button
            onClick={handleAsk}
            disabled={!question.trim() || isLoading}
            className="bg-nomad-blue hover:bg-nomad-darkBlue text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Asking...
              </>
            ) : (
              "Ask"
            )}
          </Button>
        </div>
        {response && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
            <div className="flex justify-center">
              <img
                src="/no_response.jpg"
                alt="Where is it"
                className="w-[300px] h-full object-cover rounded-lg"
              />
            </div>
            <p className="text-sm text-nomad-darkGray text-center">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AskClara; 
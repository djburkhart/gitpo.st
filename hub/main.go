// gitpo.st-hub
//
// The integration and unification layer between Gogs (Git) and GoCD (CI/CD).
// Responsibilities (MVP):
//   - Receive and normalize webhooks from Gogs
//   - Trigger GoCD pipelines via API
//   - Provide aggregated dashboard / API for "My Repos + My Pipelines"
//   - "Create Project" wizard (future)
//
// This service is intentionally small and focused so it can be the place
// where gitpo.st-specific product features live without forking the core tools.

package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	http.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		fmt.Fprint(w, "ok")
	})

	http.HandleFunc("/webhook/gogs", gogsWebhookHandler)

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{
			"service": "gitpo.st-hub",
			"status":  "hello from the unification layer",
			"docs":    "https://github.com/djburkhart/gitpo.st",
		})
	})

	log.Printf("gitpo.st-hub listening on :%s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}

// gogsWebhookHandler receives push events from Gogs and triggers GoCD.
func gogsWebhookHandler(w http.ResponseWriter, r *http.Request) {
	// TODO (MVP):
	// 1. Verify webhook secret (from env or Secret Manager)
	// 2. Parse Gogs (or GitHub-compatible) payload
	// 3. Map repo/branch to GoCD pipeline name (convention or lookup)
	// 4. Call GoCD API: POST /go/api/pipelines/{name}/schedule
	// 5. Return 200 quickly

	var payload map[string]any
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, "bad payload", http.StatusBadRequest)
		return
	}

	log.Printf("Received Gogs webhook: %+v", payload)

	// Placeholder response
	w.WriteHeader(http.StatusAccepted)
	fmt.Fprint(w, `{"status":"accepted","message":"webhook received (handler not fully implemented yet)"}`)
}

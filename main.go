package main

import (
	"embed"
	"io/fs"
	"log"
	"os"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

//go:embed all:frontend/dist/*
var distDir embed.FS

var DistDirFS, _ = fs.Sub(distDir, "frontend/dist")
func main() {
    app := pocketbase.New()

    app.OnServe().BindFunc(func(se *core.ServeEvent) error {
        // serves static files from the provided public dir (if exists)
        se.Router.GET("/{path...}", apis.Static(DistDirFS, false))

        se.Router.GET("/tiles/{path...}", apis.Static(os.DirFS("tiles"), false))
        
        return se.Next()
    })

    if err := app.Start(); err != nil {
        log.Fatal(err)
    }
}

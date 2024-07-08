package main

import (
	"carRentalSys/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	routes.UserRoutes(r)
	routes.CarRoutes(r)
	r.Run() // listen and serve on 0.0.0.0:8080
}

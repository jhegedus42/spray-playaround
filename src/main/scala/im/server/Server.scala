package im.server

import akka.actor.ActorSystem
import spray.http.MediaTypes
import im.Messages
import spray.http.HttpHeaders.RawHeader
import spray.routing.{Route, SimpleRoutingApp}

object Server extends App with SimpleRoutingApp {
  implicit val actorSystem = ActorSystem()

  def logCtx(r :  Route ):Route={
      ctx => {
        println("ctx=" + ctx)
        r(ctx)
      }
  }


      startServer(interface = "localhost", port = 3300) {
        get {
          path("hello") {
            complete {
              "Welcome to Amber Gold!"
            }
          }
        } ~
        pathPrefix("app" ) {
            ctx => {
              val cont=getFromDirectory("./app/")
              println(ctx)
              cont(ctx)
            }
        } ~
        pathPrefix("build" ) {
          ctx => {
            val cont=getFromDirectory("./build/")
            println(ctx)
            cont(ctx)
          }
        } ~
        respondWithHeader(RawHeader("Access-Control-Allow-Origin", "*")) {
            get {
              path("api" / "comments") {
                respondWithMediaType(MediaTypes.`application/json`) {
                  complete {
                    Messages.msgs
                  }
                }
              }
            }
        } ~ post {
          entity(as[String]) { s =>
            println(s)
            complete(s)
          }
        }

      }


}

package com.softwaremill.spray.server

import akka.actor.ActorSystem
import spray.http.MediaTypes
import com.softwaremill.spray.Messages
import spray.http.HttpHeaders.RawHeader
import spray.routing.SimpleRoutingApp

object Step1Complete extends App with SimpleRoutingApp {
  implicit val actorSystem = ActorSystem()

  startServer(interface = "localhost", port = 3300) {
    get {
      path("hello") {
        complete {
          "Welcome to Amber Gold!"
        }
      }
    } ~
      pathPrefix("" ) {
        getFromDirectory("./public/")
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
      }

  }

}

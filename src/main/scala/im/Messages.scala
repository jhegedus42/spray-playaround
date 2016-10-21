package im

import org.json4s._
import org.json4s.JsonDSL._
import org.json4s.native.JsonMethods._

/**
  * Created by joco on 20/10/16.
  */
object Messages {

  def msgs: String = {
    val json1=("id" -> 1 )  ~  ("author"->"joco") ~ ("text" -> "helloe")
    val jsonList = List(json1)
    compact(render(jsonList))
  }

}

/* eslint-disable quotes */
/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react"
import { PostsShow } from "./PostsShow"

test("Input container allows user to type text", () => {
  const props = {
    owner: {
      title: "mr",
      firstName: "Renato",
      lastName: "Migno",
    },
    tags: [],
    publishDate: "12-09-2021",
    image: "",
    text: "texter",
  }

  render(<PostsShow {...props} />)
  expect(screen.getByTestId("owner-title").innerHTML).toEqual(props.owner.title)
})

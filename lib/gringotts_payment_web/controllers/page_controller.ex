defmodule GringottsPaymentWeb.PageController do
  use GringottsPaymentWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end

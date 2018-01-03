defmodule GringottsPaymentWeb.PageController do
  use GringottsPaymentWeb, :controller
  alias Gringotts, as: Billing
  alias Gringotts.Gateways.Stripe

  @options [currency: "usd"]

  def index(conn, _params) do
    render conn, "index.html"
  end

  def purchase(conn, %{"id" => id }) do
    IO.puts "id token #{id}"
    value = Billing.purchase(Gringotts.Gateways.Stripe, 5, id, @options)
    IO.puts "value #{inspect value}"
    render conn, "index.html"
  end
end

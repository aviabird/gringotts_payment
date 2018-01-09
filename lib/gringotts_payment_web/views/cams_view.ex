defmodule GringottsPaymentWeb.CamsView do
  use GringottsPaymentWeb, :view

  def render("purchase.json", %{message: result}) do
    IO.puts"Result = #{result}"
  end
end
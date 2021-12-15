import pulp
x1 = pulp.LpVariable("x1")
x2 = pulp.LpVariable("x2")
x3 = pulp.LpVariable("x3")
x4 = pulp.LpVariable("x4")
x5 = pulp.LpVariable("x5")
prob = pulp.LpProblem('0', pulp.LpMaximize)
prob += 1*x1 + 1*x2 +1*x3 +1*x4 + 1*x5

prob += 3*x1 + 3*x2 +10*x3 +7*x4 + 4*x5  <= 1
prob += 5*x1 + 9*x2 +3*x3 +8*x4 + 4*x5  <= 1
prob += 6*x1 + 3*x2 +10*x3 +4*x4 + 5*x5  <= 1
prob += 3*x1 + 7*x2 +10*x3 +4*x4 + 5*x5  <= 1
prob += 5*x1 + 3*x2 +7*x3 +9*x4 + 11*x5  <= 1
status = prob.solve()
for variable in prob.variables():
    print(variable, "=", variable.varValue)
print("Результат:")
print(pulp.value(prob.objective))

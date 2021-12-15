import pulp
x1 = pulp.LpVariable("x1")
x2 = pulp.LpVariable("x2")
x3 = pulp.LpVariable("x3")
x4 = pulp.LpVariable("x4")
x5 = pulp.LpVariable("x5")
prob = pulp.LpProblem('1000000', pulp.LpMinimize)
prob += 1*x1 + 1*x2 +1*x3 +1*x4 + 1*x5

prob += 3*x1 + 5*x2 +6*x3 +3*x4 + 5*x5  >= 1
prob += 3*x1 + 9*x2 +3*x3 +7*x4 + 3*x5  >= 1
prob += 10*x1 + 3*x2 +10*x3 +10*x4 + 7*x5  >= 1
prob += 7*x1 + 8*x2 +4*x3 +4*x4 + 9*x5  >= 1
prob += 4*x1 + 4*x2 +5*x3 +5*x4 + 11*x5  >= 1
status = prob.solve()
for variable in prob.variables():
    print(variable, "=", variable.varValue)
print("Результат:")
print(pulp.value(prob.objective))
